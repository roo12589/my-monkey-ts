export function extractScriptName(importString: string): string {
    const regex = /import\s+"\.\/scripts\/(.+?)\/index"/
    const matchResult = importString.match(regex)
    return matchResult ? matchResult[1] : ''
}
