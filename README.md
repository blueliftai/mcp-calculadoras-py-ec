# Calculadoras laborales y tributarias PY/EC · Servidor MCP de BlueliftAI

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/blueliftai/mcp-calculadoras-py-ec)

**Español** · [English](README.en.md)

Servidor [MCP (Model Context Protocol)](https://modelcontextprotocol.io) público y gratuito con calculadoras laborales y tributarias de **Paraguay** y **Ecuador**: IVA, liquidación laboral, horas extras, costo de nómina (IPS, IESS, aguinaldo, décimos), impuesto a la renta, retenciones, multas por declaración tardía, multas de lavado de activos y validación de RUC, CDC y clave de acceso.

Conéctalo a Claude, ChatGPT, Cursor, VS Code o cualquier cliente MCP y pregunta en lenguaje natural. Cada respuesta cita el artículo de ley de cada línea y enlaza a la fuente oficial (SRI, DNIT, MTESS, IESS, IPS, BCP…).

| | |
|---|---|
| Endpoint MCP | `https://www.blueliftai.tech/mcp` (Streamable HTTP, sin estado) |
| Autenticación | Ninguna. Sin API key. |
| Acceso | Solo lectura: calcula, no modifica nada |
| API REST | `POST https://www.blueliftai.tech/api/v1/<herramienta>/` · [OpenAPI 3.1](https://www.blueliftai.tech/api/v1/openapi.json) |
| Guía de instalación | https://www.blueliftai.tech/es/herramientas/asistente-ia/ |
| Calculadoras web | https://www.blueliftai.tech/es/herramientas/ |

> El servidor corre en blueliftai.tech. Este repositorio contiene la interfaz pública: documentación, ejemplos de configuración, metadatos para el registro MCP y un cliente de prueba.

## Conexión rápida

### Claude (claude.ai y Claude Desktop)

**Settings → Connectors → Add custom connector** y pega la URL:

```
https://www.blueliftai.tech/mcp
```

### Claude Code

```bash
claude mcp add --transport http blueliftai-calculadoras https://www.blueliftai.tech/mcp
```

### Claude Desktop con archivo de configuración (versiones anteriores)

Edita `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`, Windows: `%APPDATA%\Claude\`). Requiere Node.js. Ver [examples/claude_desktop_config.json](examples/claude_desktop_config.json).

```json
{
  "mcpServers": {
    "blueliftai-calculadoras": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://www.blueliftai.tech/mcp"]
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json` (o `.cursor/mcp.json` en tu proyecto). Ver [examples/cursor-mcp.json](examples/cursor-mcp.json).

```json
{ "mcpServers": { "blueliftai-calculadoras": { "url": "https://www.blueliftai.tech/mcp" } } }
```

### VS Code

`.vscode/mcp.json`. Ver [examples/vscode-mcp.json](examples/vscode-mcp.json).

```json
{ "servers": { "blueliftai-calculadoras": { "type": "http", "url": "https://www.blueliftai.tech/mcp" } } }
```

### ChatGPT

**Settings → Apps & Connectors → Advanced → Developer mode**, luego **Create** un conector con la URL `https://www.blueliftai.tech/mcp` y sin autenticación. Paso a paso en [examples/chatgpt-connector.md](examples/chatgpt-connector.md).

También estará el GPT personalizado **"Asistente laboral y tributario PY/EC · BlueliftAI"** (próximamente en la GPT Store).

### Windsurf y otros clientes

Cualquier cliente compatible con MCP por Streamable HTTP funciona con la URL `https://www.blueliftai.tech/mcp`. Si tu cliente solo admite stdio, usa el puente `npx -y mcp-remote https://www.blueliftai.tech/mcp`.

## Herramientas

| Herramienta | Qué calcula | Calculadora web |
|---|---|---|
| `calcular_iva` | IVA Ecuador 15 % / 5 % / 0 %; Paraguay 10 % / 5 % / exento. Agregar o extraer el impuesto. | [calculadora-iva](https://www.blueliftai.tech/es/herramientas/calculadora-iva/) |
| `calcular_liquidacion_laboral` | Liquidación por motivo de salida: indemnización, preaviso, aguinaldo o décimos, vacaciones. | [calculadora-liquidacion-laboral](https://www.blueliftai.tech/es/herramientas/calculadora-liquidacion-laboral/) |
| `calcular_horas_extras` | Horas suplementarias, extraordinarias y nocturnas. | [calculadora-horas-extras](https://www.blueliftai.tech/es/herramientas/calculadora-horas-extras/) |
| `calcular_aguinaldo_ips_decimos` | Costo de nómina para el empleador: IPS 16,5 % y aguinaldo (PY); IESS 11,15 %, décimos y fondo de reserva (EC). | [calculadora-aguinaldo-ips-decimos](https://www.blueliftai.tech/es/herramientas/calculadora-aguinaldo-ips-decimos/) |
| `calcular_impuesto_renta` | Ecuador: tabla 2026, rebaja por gastos personales y retención mensual. Paraguay: IRP 8-10 %. | [calculadora-impuesto-renta-personas-naturales](https://www.blueliftai.tech/es/herramientas/calculadora-impuesto-renta-personas-naturales/) |
| `calcular_retenciones` | Retenciones SRI de renta e IVA 2026; retención de IVA, INR e IDU de la DNIT. | [calculadora-retenciones](https://www.blueliftai.tech/es/herramientas/calculadora-retenciones/) |
| `calcular_multas_declaracion_tardia` | SRI: multa del art. 100 LRTI e interés de mora. DNIT: Ley 125/91 art. 171 y recargo del 1,5 %. | [multas-intereses-declaracion-tardia](https://www.blueliftai.tech/es/herramientas/multas-intereses-declaracion-tardia/) |
| `calcular_multas_lavado_activos` | Rangos de multas de la UAFE (EC) y la SEPRELAD (PY). | [multas-lavado-de-activos](https://www.blueliftai.tech/es/herramientas/multas-lavado-de-activos/) |
| `validar_cdc_clave_ruc` | CDC SIFEN (44 dígitos), clave de acceso SRI (49 dígitos), RUC PY (módulo 11), RUC y cédula EC. Cálculo local del dígito verificador. | [validar-cdc-clave-de-acceso-ruc](https://www.blueliftai.tech/es/herramientas/validar-cdc-clave-de-acceso-ruc/) |

### Argumentos de ejemplo

El esquema completo de cada herramienta está en `tools/list` (MCP) y en el [OpenAPI](https://www.blueliftai.tech/api/v1/openapi.json).

| Herramienta | Argumentos |
|---|---|
| `calcular_iva` | `{"country":"py","mode":"extract","lines":[{"amount":110000,"rate":"10"}]}` |
| `calcular_liquidacion_laboral` | `{"country":"py","start":"2020-03-01","end":"2026-09-30","salary":3044000,"reason":"despido-injustificado","preaviso":false}` |
| `calcular_horas_extras` | `{"country":"ec","salary":482,"hours":{"sup50":10,"ext100":4}}` |
| `calcular_aguinaldo_ips_decimos` | `{"country":"py","groups":[{"n":3,"salary":3044000}]}` |
| `calcular_impuesto_renta` | `{"country":"ec","salary":2500,"other":0,"social":true,"expenses":3000,"cargas":2}` |
| `calcular_retenciones` | `{"country":"ec","base":1000,"iva":"15","renta":"303","buyer":"agente","ivaCase":"profesional","permanent":false}` |
| `calcular_multas_declaracion_tardia` | `{"country":"py","tax":"iva","amount":5000000,"due":"2026-08-25","pay":"2026-10-15"}` |
| `calcular_multas_lavado_activos` | `{"country":"ec","entity":"ec-fin","infraction":"ec-ros-late"}` (los ids de entidad e infracción están en la descripción de la herramienta) |
| `validar_cdc_clave_ruc` | `{"type":"ruc_py","value":"80012345"}` |

### Formato de la respuesta

Cada resultado incluye:

- `herramienta`, `pais`
- `resumen`: una frase con el resultado principal
- `resultado`: el detalle completo, con el artículo de ley de cada línea
- `fuentes`: `[{ "titulo", "url" }]` con las fuentes oficiales (SRI, DNIT, MTESS, IESS, IPS, BCP…)
- `calculadora_url`: enlace a la calculadora web con los mismos datos (`?src=mcp`)
- `aviso`: nota de que es una estimación

## API REST

Las mismas herramientas están disponibles como API REST con JSON:

```bash
curl -s https://www.blueliftai.tech/api/v1/calcular_iva/ \
  -H 'content-type: application/json' \
  -d '{"country":"ec","mode":"add","lines":[{"amount":100,"rate":"15"}]}'
```

`resumen` de la respuesta: `"Base USD 100,00 + IVA USD 15,00 = total USD 115,00."`

Especificación OpenAPI 3.1: https://www.blueliftai.tech/api/v1/openapi.json

## Cliente de prueba

```bash
cd examples
npm install
node test-client.mjs
```

Se conecta, lista las herramientas, llama a `calcular_iva` e imprime el `resumen` y las `fuentes`. Requiere Node.js 18 o superior.

## Privacidad

- No se guardan los datos que envías: el cálculo se hace en la petición y se descarta.
- Sin cuentas, sin autenticación, sin API key.
- Límite: 120 peticiones por minuto por IP.
- Los registros solo anotan el nombre de la herramienta usada, no los argumentos.
- Política de privacidad: https://www.blueliftai.tech/es/privacidad/

## Fuentes y aviso

Los resultados son **estimaciones** basadas en la normativa vigente citada en cada línea (Código del Trabajo, LRTI, Ley 125/91, Ley 6380/19, resoluciones del SRI y de la DNIT, entre otras), con enlaces a las fuentes oficiales. No reemplazan el asesoramiento profesional: confirma con tu contador o abogado antes de tomar decisiones.

## Cómo se prueban los números

El servidor MCP y la API usan exactamente las mismas funciones de cálculo que las calculadoras web de blueliftai.tech. Las pruebas de paridad verifican que el MCP, la API y la web devuelvan el mismo resultado para los mismos datos.

## Licencia

[MIT](LICENSE) © 2026 BlueliftAI

---

Hecho por [BlueliftAI](https://www.blueliftai.tech). Si quieres automatizar procesos con IA en tu empresa, hay un [diagnóstico gratuito](https://www.blueliftai.tech/es/diagnostic/).
