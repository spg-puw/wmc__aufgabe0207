export function mockDate(frozenNow) {
    const date = Date;

    return class extends date {
        constructor(...args) {
            if (args.length) {
                super(...args);
                return this;
            }
            super(frozenNow);
            return this;
        }

        static now() {
            return new date(frozenNow).getTime();
        }

        static UTC() {
            return new date(frozenNow).getTime();
        }

        [Symbol.toPrimitive](hint) {
            if (hint == 'string') {
                return this.toString();
            }
            return super[Symbol.toPrimitive](hint);
        }

        toString() {
            return this.toISOString();
        }
    };
}
