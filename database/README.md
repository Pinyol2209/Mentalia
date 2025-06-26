# Base de Datos MENTALIA - Documentación

## Descripción General

La base de datos de MENTALIA está diseñada para soportar una aplicación de bienestar emocional que funciona a través de WhatsApp, con múltiples planes de suscripción, seguimiento emocional, ejercicios guiados e informes personalizados.

## Configuración Inicial

### 1. Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crear nuevo proyecto
3. Copiar las credenciales del proyecto

### 2. Configurar variables de entorno
Crear archivo `.env.local` con:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 3. Ejecutar el schema
En el panel de Supabase, ve a "SQL Editor" y ejecuta el contenido del archivo `database/schema.sql`

## Estructura de Tablas

### 📊 **users** - Tabla principal de usuarios
Almacena información de todos los usuarios registrados en MENTALIA.

**Campos principales:**
- `id`: UUID único del usuario
- `phone_number`: Número de WhatsApp (único)
- `plan_type`: Tipo de plan (gratis, personal, plus, familiar, empresas)
- `subscription_status`: Estado de la suscripción
- `ai_personality`: Personalidad de IA configurada
- `monthly_conversations`: Contador para usuarios gratuitos
- `family_group_id`: Referencia a grupo familiar (opcional)

### 💬 **conversations** - Historial de conversaciones
Registra todas las interacciones entre usuarios y la IA.

**Características:**
- Almacena tanto mensajes del usuario como respuestas de la IA
- Detecta emociones automáticamente
- Agrupa conversaciones por `session_id`
- Registra métricas de respuesta (tokens, tiempo)

### 🧘 **exercises** - Catálogo de ejercicios
Biblioteca de ejercicios de bienestar emocional.

**Categorías:**
- Respiración
- Journaling  
- Meditación
- Autoestima
- Motivación
- Relaciones

### 📝 **user_exercises** - Progreso de ejercicios
Rastrea el progreso de cada usuario en los ejercicios.

**Funcionalidades:**
- Seguimiento de progreso (0-100%)
- Calificaciones y notas del usuario
- Datos de sesión en formato JSON

### 💭 **emotional_tracking** - Seguimiento emocional
Registra el estado emocional de los usuarios a lo largo del tiempo.

**Métricas:**
- Emoción detectada
- Intensidad (escala 1-10)
- Contexto y trigger
- Agrupación por semana/mes/año

### 📋 **reports** - Informes personalizados
Genera informes semanales y mensuales para usuarios.

**Contenido:**
- Resumen emocional
- Tendencias de estado de ánimo
- Ejercicios completados
- Recomendaciones personalizadas
- URL del PDF generado

### 👨‍👩‍👧 **family_groups** - Grupos familiares
Gestiona suscripciones familiares con múltiples usuarios.

### 🤖 **ai_personalities** - Personalidades de IA
Define diferentes estilos de respuesta de la IA.

**Tipos disponibles:**
- Empático (gratuito)
- Filosófico (premium)
- Coach (premium)
- Espiritual (premium)

### 💳 **subscriptions** - Historial de pagos
Registra todas las transacciones y suscripciones.

### 🌅 **daily_motivations** - Mensajes motivacionales
Programa y rastrea mensajes motivacionales diarios.

### ⚙️ **system_settings** - Configuración del sistema
Almacena configuraciones globales de la aplicación.

### 📊 **analytics** - Métricas y analytics
Registra eventos para análisis de uso y comportamiento.

## Relaciones Principales

```
users (1) ←→ (N) conversations
users (1) ←→ (N) user_exercises  
users (1) ←→ (N) emotional_tracking
users (1) ←→ (N) reports
users (N) ←→ (1) family_groups

exercises (1) ←→ (N) user_exercises
ai_personalities (1) ←→ (N) users
```

## Índices de Rendimiento

### Índices creados automáticamente:
- `users.phone_number` - Búsqueda rápida por teléfono
- `conversations.user_id` - Conversaciones por usuario
- `conversations.session_id` - Conversaciones por sesión
- `emotional_tracking.user_id` - Seguimiento por usuario
- `emotional_tracking.date` - Consultas por fecha

## Triggers y Automatización

### 🔄 **Triggers activos:**

1. **`trigger_update_user_last_active`**
   - Se ejecuta al insertar nuevas conversaciones
   - Actualiza automáticamente `users.last_active_at`

2. **`trigger_reset_monthly_conversations`**
   - Se ejecuta al actualizar usuarios
   - Resetea contador mensual cuando es necesario

## Funciones de Servicios

### 👤 **UserService**
```typescript
// Crear o encontrar usuario
await UserService.findOrCreateUser(phoneNumber, userData)

// Verificar límites de conversación
await UserService.canUserChat(userId)

// Actualizar plan de usuario
await UserService.updateUserPlan(userId, planType)
```

### 💬 **ConversationService**
```typescript
// Crear nueva conversación
await ConversationService.createConversation(userId, content, messageType)

// Obtener contexto para IA
await ConversationService.getConversationContext(userId, sessionId)

// Estadísticas de conversación
await ConversationService.getConversationStats(userId)
```

### 🧘 **ExerciseService**
```typescript
// Obtener ejercicios disponibles
await ExerciseService.getAvailableExercises(category, difficulty)

// Iniciar ejercicio
await ExerciseService.startExercise(userId, exerciseId)

// Registrar emoción
await ExerciseService.trackEmotion(userId, emotion, intensity)
```

## Políticas de Seguridad (RLS)

### Configuraciones recomendadas en Supabase:

1. **users**: Solo el propio usuario puede ver/editar sus datos
2. **conversations**: Solo el usuario propietario puede acceder
3. **user_exercises**: Solo el usuario propietario puede acceder
4. **emotional_tracking**: Solo el usuario propietario puede acceder
5. **reports**: Solo el usuario propietario puede acceder

## Mantenimiento y Limpieza

### 🧹 **Tareas de mantenimiento:**

1. **Limpieza de conversaciones antiguas** (GDPR)
   ```typescript
   await ConversationService.cleanupOldConversations(365) // 1 año
   ```

2. **Generación automática de informes**
   - Ejecutar semanalmente para usuarios Plus+
   - Ejecutar mensualmente para todos los usuarios

3. **Optimización de índices**
   - Revisar rendimiento mensualmente
   - Añadir índices según patrones de uso

## Migraciones y Actualizaciones

### Para añadir nuevas funcionalidades:

1. Crear migration SQL en `database/migrations/`
2. Actualizar tipos TypeScript en `lib/supabase.ts`
3. Añadir funciones de servicio correspondientes
4. Actualizar documentación

## Métricas y Monitoreo

### 📈 **KPIs importantes:**
- Usuarios activos diarios/mensuales
- Conversaciones por usuario por plan
- Tasa de completación de ejercicios
- Tiempo de respuesta de la IA
- Retención de usuarios por plan

### 🚨 **Alertas recomendadas:**
- Uso excesivo de tokens de IA
- Errores de base de datos > 5%
- Tiempo de respuesta > 30s
- Usuarios que exceden límites

## Backup y Recuperación

### Configuración en Supabase:
1. Habilitar backups automáticos diarios
2. Configurar Point-in-Time Recovery
3. Exportar schema periódicamente
4. Documentar procedimientos de restauración

## Escalabilidad

### Para crecimiento futuro:
- **Read replicas** para consultas analíticas
- **Connection pooling** para alta concurrencia
- **Particionado** de tablas por fecha (conversations, analytics)
- **Archivado** de datos históricos

---

## Comandos Útiles

### Desarrollo local:
```bash
# Generar tipos TypeScript
npx supabase gen types typescript --project-id tu_proyecto_id > lib/database.types.ts

# Reset base de datos
supabase db reset

# Aplicar migraciones
supabase db push
```

### Producción:
```sql
-- Verificar salud de la BD
SELECT schemaname, tablename, attname, n_distinct, correlation 
FROM pg_stats WHERE tablename IN ('users', 'conversations', 'exercises');

-- Estadísticas de uso
SELECT plan_type, COUNT(*) as users, AVG(monthly_conversations) as avg_conversations
FROM users WHERE is_active = true GROUP BY plan_type;
```

---

¿Tienes alguna pregunta específica sobre la configuración o uso de la base de datos? 