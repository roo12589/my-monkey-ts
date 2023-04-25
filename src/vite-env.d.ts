/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />
declare global {
    interface Window {
        f: any
    }
}
/**
 *  必须任意导入或导出才能被识别为模块
 *  注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
*/
export {};
