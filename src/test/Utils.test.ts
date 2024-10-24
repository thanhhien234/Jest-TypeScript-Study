import { StringUtils, toUpperCase } from "../app/Utils";

describe ('Utils test', () => {

    // Test a class method
    describe('StringUtils tests', ()=>{
        test('should return uppercase', () => {
            const sut = new StringUtils();
            const actual = sut.toUpperCase('hello');
            expect(actual).toBe('HELLO');
        });   
    });


    // Test a function
    test('should return uppercase', () => {
        const result = toUpperCase('hello');
        expect(result).toBe('HELLO');
    });   
     

    // Table driven test: run the test for each input
    describe('ToUpperCase examples', ()=>{
        it.each([
            {input:'abc', expected: 'ABC'},
            {input:'My-String', expected: 'MY-STRING'},
            {input:'def', expected: 'DEF'}
        ])('$input toUpperCase should be $expected', ({input, expected})=>{
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    })


    //Test a hook
    describe('StringUtils tests', () => {
        let sut: StringUtils;
        beforeAll(()=>{
            console.log('Before all'); // connect to database, etc.
        });
        beforeEach(()=>{
            sut = new StringUtils();
        });
        afterEach(()=>{
            console.log('Cleaning up');
        });
    
        it('should return uppercase', () => {
            const actual = sut.toUpperCase('hello');
            expect(actual).toBe('HELLO');
        });

        // Test a method that throws an error(3 methods)
        it('should throw error on invalid argument - using function', () => {
            function expectError(){
                sut.toUpperCase('');
            }
            expect(expectError).toThrowError();
            expect(expectError).toThrowError('Argument Error');
        });

        it('should throw error on invalid argument - using arrow function', () => {
            expect(() => {
                sut.toUpperCase('');
            }).toThrowError();
        });

        it('should throw error on invalid argument - using try-catch block', async () => {
            try {
                sut.toUpperCase('');
            }
            catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Argument Error');
            }
        });


    })
    
});