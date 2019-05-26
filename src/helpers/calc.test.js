import { calculateAmount } from './calc';

describe('helper functions', () => {
    it('converts amount against provided rate', () => {
        expect(calculateAmount(4, 4.657898)).toEqual(18.63);
        expect(calculateAmount(0, 0)).toEqual(0);
        expect(calculateAmount(1, 1)).toEqual(1);
        expect(calculateAmount(0, 1)).toEqual(0);
        expect(calculateAmount(1, 0)).toEqual(0);
        expect(calculateAmount(1, null)).toEqual(0);
        expect(calculateAmount(1, undefined)).toEqual(0);
        expect(calculateAmount(4, 4)).toEqual(16);
    });
});
