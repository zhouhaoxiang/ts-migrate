import { mockPluginParams } from '../test-utils';
import memberAccessibilityPlugin from '../../src/plugins/member-accessibility';

describe('member-accessibility plugin', () => {
  it('adds accessibility modifiers to class elements', () => {
    const text = `\
class C {
    _privateProperty: any;
    static _privateStaticProperty: any;
    _privateMethod() {}
    get _privateGetter() {}
    set _privateSetter(v) {}
    public _looksPrivate() {}
}`;

    const result = memberAccessibilityPlugin.run(
      mockPluginParams({ text, fileName: 'file.tsx', options: { privateRegex: '^_' } }),
    );

    expect(result).toBe(`\
class C {
    private _privateProperty: any;
    private static _privateStaticProperty: any;
    private _privateMethod() { }
    private get _privateGetter() { }
    private set _privateSetter(v) { }
    public _looksPrivate() { }
}
`);
  });
});
