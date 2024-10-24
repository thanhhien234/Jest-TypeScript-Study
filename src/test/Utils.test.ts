import { StringUtils } from "../app/Utils";

describe('StringUtils', () => {
    const stringUtils = new StringUtils();

    // only: 이 테스트만 실행
    it.only('should convert a string to uppercase', () => {
        const input = 'hello';
        const result = stringUtils.toUpperCase(input);
        expect(result).toBe('HELLO');
    });

    // skip: 이 테스트는 실행하지 않음. null argument에 대한 오류를 throw하는 테스트는 건너뜁니다.
    it.skip('should throw an error for empty argument', () => {
        expect(() => {
            stringUtils.toUpperCase('');
        }).toThrow('Argument Error');
    });

    // todo: 이 테스트는 아직 작성되지 않았음, 나중에 구현할 것임
    it.todo('should convert a string to uppercase for undefined input'); // Placeholder for future test case

    // concurrent: 여러 테스트를 동시에 실행
    it.concurrent('should handle multiple concurrent calls', async () => {
        const inputs = ['test', 'string', 'utils'];
        const promises = inputs.map(input => {
            return Promise.resolve(stringUtils.toUpperCase(input));
        });
        const results = await Promise.all(promises);
        expect(results).toEqual(['TEST', 'STRING', 'UTILS']);
    });
});




