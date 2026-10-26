# Paraguay & Ecuador labor and tax calculators · BlueliftAI MCP server

[Español](README.md) · **English**

A free, public [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server with labor and tax calculators for **Paraguay** and **Ecuador**: VAT (IVA), severance, overtime, payroll cost (IPS, IESS, aguinaldo, décimos), personal income tax, withholdings, late-filing fines, anti-money-laundering fines, and RUC / CDC / access-key validation.

Connect it to Claude, ChatGPT, Cursor, VS Code or any MCP client and ask in plain language. Every answer cites the legal article behind each line and links to the official source (SRI, DNIT, MTESS, IESS, IPS, BCP…). Tool output is in Spanish.

| | |
|---|---|
| MCP endpoint | `https://www.blueliftai.tech/mcp` (Streamable HTTP, stateless) |
| Auth | None. No API key. |
| Access | Read-only: it calculates, it changes nothing |
| REST API | `POST https://www.blueliftai.tech/api/v1/<tool>/` · [OpenAPI 3.1](https://www.blueliftai.tech/api/v1/openapi.json) |
| Setup guide | https://www.blueliftai.tech/es/herramientas/asistente-ia/ |
| Web calculators | https://www.blueliftai.tech/es/herramientas/ |

> The server runs on blueliftai.tech. This repository holds the public interface: docs, config examples, MCP registry metadata and a test client.

## Quick connect

### Claude (claude.ai and Claude Desktop)

**Settings → Connectors → Add custom connector** and paste the URL:

```
https://www.blueliftai.tech/mcp
```

### Claude Code

```bash
claude mcp add --transport http blueliftai-calculadoras https://www.blueliftai.tech/mcp
```

### Claude Desktop via config file (older versions)

Edit `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`, Windows: `%APPDATA%\Claude\`). Requires Node.js. See [examples/claude_desktop_config.json](examples/claude_desktop_config.json).

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

`~/.cursor/mcp.json` (or `.cursor/mcp.json` in your project). See [examples/cursor-mcp.json](examples/cursor-mcp.json).

```json
{ "mcpServers": { "blueliftai-calculadoras": { "url": "https://www.blueliftai.tech/mcp" } } }
```

### VS Code

`.vscode/mcp.json`. See [examples/vscode-mcp.json](examples/vscode-mcp.json).

```json
{ "servers": { "blueliftai-calculadoras": { "type": "http", "url": "https://www.blueliftai.tech/mcp" } } }
```

### ChatGPT

**Settings → Apps & Connectors → Advanced → Developer mode**, then **Create** a connector with the URL `https://www.blueliftai.tech/mcp` and no authentication. Step by step in [examples/chatgpt-connector.md](examples/chatgpt-connector.md).

There will also be a Custom GPT, **"Asistente laboral y tributario PY/EC · BlueliftAI"** (coming soon to the GPT Store).

### Windsurf and other clients

Any MCP client that supports Streamable HTTP works with `https://www.blueliftai.tech/mcp`. If your client only supports stdio, use the bridge `npx -y mcp-remote https://www.blueliftai.tech/mcp`.

## Tools

| Tool | What it calculates | Web calculator |
|---|---|---|
| `calcular_iva` | VAT Ecuador 15 % / 5 % / 0 %; Paraguay 10 % / 5 % / exempt. Add or extract the tax. | [calculadora-iva](https://www.blueliftai.tech/es/herramientas/calculadora-iva/) |
| `calcular_liquidacion_laboral` | Severance by termination reason: indemnity, notice pay, aguinaldo or décimos, vacation. | [calculadora-liquidacion-laboral](https://www.blueliftai.tech/es/herramientas/calculadora-liquidacion-laboral/) |
| `calcular_horas_extras` | Overtime: supplementary, extraordinary and night hours. | [calculadora-horas-extras](https://www.blueliftai.tech/es/herramientas/calculadora-horas-extras/) |
| `calcular_aguinaldo_ips_decimos` | Employer payroll cost: IPS 16.5 % and aguinaldo (PY); IESS 11.15 %, décimos and reserve fund (EC). | [calculadora-aguinaldo-ips-decimos](https://www.blueliftai.tech/es/herramientas/calculadora-aguinaldo-ips-decimos/) |
| `calcular_impuesto_renta` | Ecuador: 2026 table, personal-expense rebate and monthly withholding. Paraguay: IRP 8-10 %. | [calculadora-impuesto-renta-personas-naturales](https://www.blueliftai.tech/es/herramientas/calculadora-impuesto-renta-personas-naturales/) |
| `calcular_retenciones` | SRI income-tax and VAT withholding 2026; DNIT VAT withholding, INR and IDU. | [calculadora-retenciones](https://www.blueliftai.tech/es/herramientas/calculadora-retenciones/) |
| `calcular_multas_declaracion_tardia` | SRI: LRTI art. 100 fine plus late interest. DNIT: Law 125/91 art. 171 plus 1.5 % surcharge. | [multas-intereses-declaracion-tardia](https://www.blueliftai.tech/es/herramientas/multas-intereses-declaracion-tardia/) |
| `calcular_multas_lavado_activos` | AML fine ranges from UAFE (EC) and SEPRELAD (PY). | [multas-lavado-de-activos](https://www.blueliftai.tech/es/herramientas/multas-lavado-de-activos/) |
| `validar_cdc_clave_ruc` | SIFEN CDC (44 digits), SRI access key (49 digits), PY RUC (mod 11), EC RUC and cédula. Local check-digit math. | [validar-cdc-clave-de-acceso-ruc](https://www.blueliftai.tech/es/herramientas/validar-cdc-clave-de-acceso-ruc/) |

### Example arguments

The full schema for each tool is in `tools/list` (MCP) and in the [OpenAPI spec](https://www.blueliftai.tech/api/v1/openapi.json).

| Tool | Arguments |
|---|---|
| `calcular_iva` | `{"country":"py","mode":"extract","lines":[{"amount":110000,"rate":"10"}]}` |
| `calcular_liquidacion_laboral` | `{"country":"py","start":"2020-03-01","end":"2026-09-30","salary":3044000,"reason":"despido-injustificado","preaviso":false}` |
| `calcular_horas_extras` | `{"country":"ec","salary":482,"hours":{"sup50":10,"ext100":4}}` |
| `calcular_aguinaldo_ips_decimos` | `{"country":"py","groups":[{"n":3,"salary":3044000}]}` |
| `calcular_impuesto_renta` | `{"country":"ec","salary":2500,"other":0,"social":true,"expenses":3000,"cargas":2}` |
| `calcular_retenciones` | `{"country":"ec","base":1000,"iva":"15","renta":"303","buyer":"agente","ivaCase":"profesional","permanent":false}` |
| `calcular_multas_declaracion_tardia` | `{"country":"py","tax":"iva","amount":5000000,"due":"2026-08-25","pay":"2026-10-15"}` |
| `calcular_multas_lavado_activos` | `{"country":"ec","entity":"ec-fin","infraction":"ec-ros-late"}` (entity and infraction ids are listed in the tool description) |
| `validar_cdc_clave_ruc` | `{"type":"ruc_py","value":"80012345"}` |

### Response format

Every result includes:

- `herramienta`, `pais`
- `resumen`: one sentence with the main result
- `resultado`: full detail, with the legal article for each line
- `fuentes`: `[{ "titulo", "url" }]` with official sources (SRI, DNIT, MTESS, IESS, IPS, BCP…)
- `calculadora_url`: link to the web calculator with the same inputs (`?src=mcp`)
- `aviso`: a note that this is an estimate

## REST API

The same tools are available as a JSON REST API:

```bash
curl -s https://www.blueliftai.tech/api/v1/calcular_iva/ \
  -H 'content-type: application/json' \
  -d '{"country":"ec","mode":"add","lines":[{"amount":100,"rate":"15"}]}'
```

Response `resumen`: `"Base USD 100,00 + IVA USD 15,00 = total USD 115,00."`

OpenAPI 3.1 spec: https://www.blueliftai.tech/api/v1/openapi.json

## Test client

```bash
cd examples
npm install
node test-client.mjs
```

It connects, lists the tools, calls `calcular_iva` and prints the `resumen` and `fuentes`. Requires Node.js 18 or later.

## Privacy

- The data you send is not stored: the calculation happens in the request and is discarded.
- No accounts, no authentication, no API key.
- Rate limit: 120 requests per minute per IP.
- Logs record only the tool name, not the arguments.
- Privacy policy: https://www.blueliftai.tech/es/privacidad/

## Sources and disclaimer

Results are **estimates** based on the regulations cited on each line (labor codes, LRTI, Law 125/91, Law 6380/19, SRI and DNIT resolutions, among others), with links to official sources. They are not professional advice: check with your accountant or lawyer before making decisions.

## How the numbers are tested

The MCP server and the REST API use exactly the same calculation functions as the web calculators on blueliftai.tech. Parity tests check that the MCP server, the API and the web return the same result for the same inputs.

## License

[MIT](LICENSE) © 2026 BlueliftAI

---

Made by [BlueliftAI](https://www.blueliftai.tech). If you want to automate processes with AI in your company, there is a [free diagnostic](https://www.blueliftai.tech/es/diagnostic/).
