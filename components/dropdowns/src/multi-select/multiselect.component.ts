import Vue from 'vue';
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';


export const properties: string[] = ['actionFailureTemplate', 'allowCustomValue', 'allowFiltering', 'closePopupOnSelect', 'cssClass', 'dataSource', 'delimiterChar', 'enablePersistence', 'enableRtl', 'enableSelectionOrder', 'enabled', 'fields', 'filterBarPlaceholder', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'hideSelectedItem', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'maximumSelectionLength', 'mode', 'noRecordsTemplate', 'openOnClick', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'selectAllText', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'chipSelection', 'close', 'created', 'customValueSelection', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'removed', 'removing', 'select', 'selectedAll', 'tagging'];
export const modelProps: string[] = ['value'];

/**
 * MultiSelect component allows the user to select a value from the predefined list of values.
 * ```html
 * <ejs-multiselect :dataSource='data'></ejs-multiselect>
 * ```
 */
@EJComponentDecorator({
    props: properties,
    model: {
        event: 'modelchanged'
    }
})
export class MultiSelectComponent extends ComponentBase {
    
    public ej2Instances: any;
    public propKeys: string[] = properties;
    public models: string[] = modelProps;
    public hasChildDirective: boolean = false;
    protected hasInjectedModules: boolean = true;
    public tagMapper: { [key: string]: Object } = {};
    public tagNameMapper: Object = {};
    
    constructor() {
        super();
        this.ej2Instances = new MultiSelect({});        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
        //this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        //this.ej2Instances.setProperties = this.setProperties;

        this.bindProperties();
    }
    public trigger(eventName: string, eventProp: {[key:string]:Object}): void {
        if (eventName === 'change' && this.models && (this.models.length !== 0)) {
            let key: string[] = this.models.toString().match(/checked|value/) || [];
            let propKey: string = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                (this as any).$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp);
        }            
    }

    public setProperties(prop: any, muteOnChange: boolean): void {
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && (this.models.length !== 0)) {
            let keys: string[] = Object.keys(prop);
            let emitKeys: string[] = [];
            let emitFlag: boolean = false;
            keys.map((key: string): void => {
                this.models.map((model: string): void => {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        emitKeys.push(key);
                        emitFlag = true;
                    }
                });
            });
            if (emitFlag) {
                emitKeys.map((propKey: string): void => {
                    this.$emit('update:' + propKey, prop[propKey]);
                })
            }
        }
    }

    public render(createElement: any) {
        return createElement('input', (this as any).$slots.default);
    }
    
    public addItem(items: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void {
        return this.ej2Instances.addItem(items, itemIndex);
    }

    public getDataByValue(value: string | number | boolean): undefined {
        return this.ej2Instances.getDataByValue(value);
    }

    public getItems(): undefined {
        return this.ej2Instances.getItems();
    }

    public hidePopup(): void {
        return this.ej2Instances.hidePopup();
    }

    public hideSpinner(): void {
        return this.ej2Instances.hideSpinner();
    }

    public requiredModules(): undefined {
        return this.ej2Instances.requiredModules();
    }

    public selectAll(state: boolean): void {
        return this.ej2Instances.selectAll(state);
    }

    public showPopup(): void {
        return this.ej2Instances.showPopup();
    }

    public showSpinner(): void {
        return this.ej2Instances.showSpinner();
    }
}

export const MultiSelectPlugin = {
    name: 'ejs-multiselect',
    install(Vue: any) {
        Vue.component(MultiSelectPlugin.name, MultiSelectComponent);

    }
}
