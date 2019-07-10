import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function(){
    var defults = {//默认值
        title: '',
        content :'',
        cancel : '',
        ok: '',
        handleCancel : null,
        handleOk: null
    };
    
    var MyComponent = Vue.extend(MessageBox);

    return function(opts){  //配置参数
        for(var attr in opts) {
            defults[attr] = opts[attr];
        }

        var vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defults.title,
                content: defults.content,
                cancel: defults.cancel,
                ok: defults.ok
            },
            methods: {
                handleCancel(){
                    defults.handleCancel && defults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                },
                handleOk(){
                    defults.handleOk && defults.handleOk.call(this);
                    document.body.removeChild( vm.$el )
                }
            }
        });

        document.body.appendChild( vm.$el );

    }
})();