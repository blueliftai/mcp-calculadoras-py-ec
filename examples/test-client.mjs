// Minimal MCP client for the BlueliftAI calculators server.
// Usage (Node >= 18):
//   cd examples && npm install && node test-client.mjs [server-url]
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const url = new URL(process.argv[2] ?? 'https://www.blueliftai.tech/mcp');

const client = new Client({ name: 'blueliftai-test-client', version: '1.0.0' });
const transport = new StreamableHTTPClientTransport(url);

try {
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log(`Connected to ${url} - ${tools.length} tools:`);
  for (const tool of tools) console.log(`  - ${tool.name}`);

  const result = await client.callTool({
    name: 'calcular_iva',
    arguments: { country: 'ec', mode: 'add', lines: [{ amount: 100, rate: '15' }] },
  });

  if (result.isError) {
    console.error('Tool error:', JSON.stringify(result.content, null, 2));
    process.exitCode = 1;
  } else {
    const data =
      result.structuredContent ??
      JSON.parse(result.content.find((c) => c.type === 'text')?.text ?? '{}');
    console.log('\nResumen:', data.resumen);
    console.log('Fuentes:');
    for (const f of data.fuentes ?? []) console.log(`  - ${f.titulo}: ${f.url}`);
    console.log('Calculadora web:', data.calculadora_url);
  }
} finally {
  await client.close();
}
