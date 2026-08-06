import * as path from "@std/path";
import * as esbuild from "esbuild";

const version = "11.16.0";
const packageName = "mermaid";

async function runCustomCommand(command: Deno.Command) {
  const { stdout, stderr, code, success } = await command.output();
  console.log(new TextDecoder().decode(stdout));
  console.log(new TextDecoder().decode(stderr));
  console.log(`Success: ${success}, Code: ${code}`);
}

// Clean up existing version directory
await Deno.remove(version, { recursive: true }).catch((e) => console.log(e));
// Create a new directory for the given version
await Deno.mkdirSync(version);

// Install mermaid
await runCustomCommand(
  new Deno.Command("npm", {
    args: [
      "install",
      "--prefix",
      path.join(version, "temp"),
      `${packageName}@${version}`,
    ],
  }),
);

// Bundle into a single file
await esbuild.build({
  entryPoints: [
    path.join(
      ".",
      version,
      "temp",
      "node_modules",
      "mermaid",
      "dist",
      "mermaid.esm.mjs",
    ).toString(),
  ],
  minify: true,
  bundle: true,
  outfile: path.join(".", version, "mermaid.iife.js").toString(),
  format: "iife",
  globalName: "mermaid",
});

esbuild.stop();

// Retain important files
await runCustomCommand(
  new Deno.Command("mv", {
    args: [
      `${version}/temp/node_modules/mermaid/README.md`,
      `${version}/temp/node_modules/mermaid/LICENSE`,
      `${version}/`,
    ],
  }),
);

// Delete package.json files from the version directory
await Deno.remove(path.join(version, "temp"), { recursive: true });
