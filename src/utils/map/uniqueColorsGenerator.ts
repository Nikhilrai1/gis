// utils function for unique color generation 
export function generateUniqueHexColors(n: number): string[] {
    const colors: string[] = [];
    const characters: string = '0123456789ABCDEF';

    while (colors.length < n) {
        let color: string = '#';
        for (let i = 0; i < 6; i++) {
            color += characters[Math.floor(Math.random() * 16)];
        }
        if (!colors.includes(color)) {
            colors.push(color);
        }
    }
    return colors;
}