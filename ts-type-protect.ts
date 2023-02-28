// typescript 类型保护
interface A {
    a: () => void;
}

interface B {
    b: () => void;
}

const protect = (aOrB: A | B) => {
    // 类型保护
    if ('a' in aOrB) {
        aOrB.a();
    }
}

interface C {
    content: string;
    width: number;
    height: number;
}

// 剔除 width
type D = Omit<C, 'width'>;
// 只留 width
type E = Pick<C, 'width'>;

const d: D = {
    content: '',
    height: 0,
}