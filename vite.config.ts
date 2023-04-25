import { PluginOption, UserConfig, defineConfig } from "vite"
import monkey, { MonkeyOption, MonkeyUserScript } from "vite-plugin-monkey"
import fs from "fs"
import { extractScriptName } from "./src/utils"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === "production"
    const plugins: PluginOption[] = []
    const devOption: PluginOption = monkey({
        entry: "src/main.ts",
        userscript: {
            name: "###dev:my-money-ts###",
            icon: "https://vitejs.dev/logo.svg",
            namespace: "npm/vite-plugin-monkey",
            match: ["https://www.google.com/", "https://www.google.com.hk/"],
        },
    })
    if (isProd) {
        const map = new Map<string, MonkeyUserScript>([
            [
                "qidian-modal-repair",
                {
                    name: "起点弹窗优化",
                    version: "0.1",
                    icon: "https://vitejs.dev/logo.svg",
                    namespace: "github/roo12589",
                    author: "roo12589",
                    match: ["https://vipreader.qidian.com/chapter/*"],
                    // updateURL: '',
                    // downloadURL: '',
                },
            ],

            [
                "web-link-auto-skip",
                {
                    name: "多网站外链自动跳转",
                    version: "0.1",
                    icon: "https://vitejs.dev/logo.svg",
                    namespace: "github/roo12589",
                    author: "roo12589",
                    match: [
                        "https://link.zhihu.com/?target=*",
                        "https://link.juejin.cn/?target=*",
                        "https://link.csdn.net/?target=*",
                    ],
                    // updateURL: '',
                    // downloadURL: '',
                },
            ],
            [
                "weibo-auto-refresh",
                {
                    name: "微博自动刷新(特别关注)",
                    version: "0.1",
                    icon: "https://vitejs.dev/logo.svg",
                    namespace: "github/roo12589",
                    author: "roo12589",
                    match: ["https://weibo.com/*"],
                    // updateURL: '',
                    // downloadURL: '',
                },
            ],
        ])
        const importString = fs
            .readFileSync("./src/main.ts")
            .toString()
            .split("\r\n")
            .filter((line) => line && !line.startsWith("//"))[0]
        const scriptName = extractScriptName(importString)
        const scriptOption = map.get(scriptName)
        console.log(importString, scriptName)

        const option: PluginOption = monkey({
            entry: "src/main.ts",
            userscript: scriptOption,
            build: {
                fileName: `${scriptName ?? "error"}.user.js`,
            },
        })
        plugins.push(option)
    } else {
        plugins.push(devOption)
    }

    const config: UserConfig = {
        plugins,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            emptyOutDir: false,
        },
    }
    return config
})
