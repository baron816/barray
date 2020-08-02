import "regenerator-runtime/runtime";
import { Barray } from '../src/index';

describe('Barray', () => {
    it('push works correctly with single value', () => {
        const barr = Barray(1,2,3,4,5);
        barr.push(6);

        expect(barr.toString()).toBe('1,2,3,4,5,6');
        expect(barr.length).toBe(6);
    });

    it('push works with multiple values', () => {
        const barr = Barray(1,2,3,4,5);
        barr.push(6, 7, 8);

        expect(barr.toString()).toBe('1,2,3,4,5,6,7,8');
        expect(barr.length).toBe(8);
    });

    it('push works in sequence', () => {
        const barr = Barray(1,2,3,4,5);
        barr.push(6);
        barr.push(7);

        expect(barr.toString()).toBe('1,2,3,4,5,6,7');
        expect(barr.length).toBe(7);
    })

    it('allows unshifting a value', () => {
        const barr = Barray(1,2,3,4,5);
        barr.unshift(0);

        expect(barr.toString()).toBe('0,1,2,3,4,5');
        expect(barr.length).toBe(6)
    });

    it('allosw unshifting multiple values', () => {
        const barr = Barray(1,2,3,4,5);
        barr.unshift(-2, -1, 0);

        expect(barr.toString()).toBe('-2,-1,0,1,2,3,4,5');
        expect(barr.length).toBe(8);
    });

    it('allows unshifting in sequence', () => {
        const barr = Barray(1,2,3);
        barr.unshift(0);
        barr.unshift(-1);

        expect(barr.toString()).toBe('-1,0,1,2,3');
        expect(barr.length).toBe(5);
    });

    it('allows popping', () => {
        const barr = Barray(1,2,3);
        const val = barr.pop();

        expect(barr.toString()).toBe('1,2');
        expect(val).toBe(3);
        expect(barr.length).toBe(2);
    });

    it('allows shifting', () => {
        const barr = Barray(1,2,3);
        const val = barr.shift();

        expect(barr.toString()).toBe('2,3');
        expect(val).toBe(1);
        expect(barr.length).toBe(2)
    })

})