import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

export let AnnotationsDirective =  vueDefineComponent({
    inject: { custom: { default: null } },
    render(createElement: any): void {
        if (!isExecute) {
            let h: any = !isExecute ? gh : createElement;
            let slots: any = null;
            if(!isNullOrUndefined((this as any).$slots.default)) {
                slots = !isExecute ? (this as any).$slots.default() : (this as any).$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated(): void {
        if (!isExecute && this.custom) { this.custom() }
    },
    methods: {
        getTag(): string {
            return 'e-annotations';
        }
    }
});
export const AnnotationsPlugin = {
    name: 'e-annotations',
    install(Vue: any) {
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
}

/**
 * Represents the directive to render and customize the annotations in the linear gauge.
 * ```vue
 * <ejs-lineargauge>
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * </ejs-lineargauge>
 * ```
 */
export let AnnotationDirective =  vueDefineComponent({
    render(): void {
        return;
    },
    methods: {
        getTag(): string {
            return 'e-annotation';
        }
    }
});
export const AnnotationPlugin = {
    name: 'e-annotation',
    install(Vue: any) {
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
    }
}