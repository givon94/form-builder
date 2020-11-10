export const basicComponents = [
    // {
    //     type: 'formName',
    //     name: 'Перезвоним через 2 минуты',
    // },
    {
        type: 'title',
        name: 'Заголовок',
        icon: 'icon-title',
    },
    {
        type: 'someText',
        name: 'Обычный текст',
        icon: 'icon-wenzishezhi',
    },
    {
        type: 'input',
        name: 'Обычное поле',
        icon: 'icon-input',
        bgIcon: true,
        label: 'Заголовок',
        options: {
            name: '',
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: '',
            disabled: false,
        },
        style: {
            className: '',
        }
    },
    {
        type: 'number',
        name: 'Числовое поле',
        icon: 'icon-number',
        bgIcon: true,
        options: {
            name: '',
            width: '',
            required: false,
            defaultValue: 0,
            min: '',
            max: '',
            step: 1,
            disabled: false,
            controlsPosition: '',
        },
        style: {
            className: '',
        }
    },
    {
        type: 'select',
        name: 'Выпадающий список',
        icon: 'icon-tabs',
        bgIcon: true,
        options: {
            name: '',
            defaultValue: '',
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: false,
            width: '',
            options: [
                {
                    value: 'Option 1',
                },
                {
                    value: 'Option 2',
                },
                {
                    value: 'Option 3',
                },
            ],
            remote: false,
            filterable: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label',
            },
            remoteFunc: '',
            style: {
                className: '',
            }
        },
    },
    {
        type: 'name',
        name: 'Имя',
        icon: 'icon-user1',
        bgIcon: true,
        options: {
            name: 'name',
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: 'Впишите имя',
            disabled: false,
        },
        style: {
            className: '',
        }
    },
    {
        type: 'phone',
        name: 'Телефон',
        icon: 'icon-phone',
        bgIcon: true,
        options: {
            name: 'phone',
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: 'Впишите телефон',
            disabled: false,
        },
        style: {
            className: '',
        }
    },
    {
        type: 'email',
        name: 'Email',
        icon: 'icon-185078emailmailstreamline',
        bgIcon: true,
        options: {
            name: 'email',
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: 'Впишите email',
            disabled: false,
        },
        style: {
            className: '',
        }
    },
    {
        type: 'textarea',
        name: 'Сообщение',
        icon: 'icon-8textarea',
        bgIcon: true,
        options: {
            name: 'message',
            width: '100%',
            defaultValue: '',
            required: false,
            disabled: false,
            pattern: '',
            placeholder: 'Сообщение',
        },
        style: {
            className: '',
        }
    },
    {
        type: 'date',
        name: 'Дата',
        icon: 'icon-date',
        bgIcon: true,
        options: {
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
            required: false,
            width: '',
        },
        style: {
            className: '',
        }
    },
    {
        type: 'time',
        name: 'Время',
        icon: 'icon-clock',
        bgIcon: true,
        options: {
            defaultValue: '21:19:56',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            isRange: false,
            arrowControl: true,
            format: 'HH:mm:ss',
            required: false,
            width: '',
        },
        style: {
            className: '',
        }
    },
    {
        type: 'radio',
        name: 'Радио кнопки',
        icon: 'icon-radio',
        options: {
            inline: false,
            defaultValue: '',
            showLabel: false,
            options: [
                {
                    value: 'Option 1',
                    label: 'Option 1',
                },
                {
                    value: 'Option 2',
                    label: 'Option 2',
                },
                {
                    value: 'Option 3',
                    label: 'Option 3',
                },
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label',
            },
            remoteFunc: '',
            disabled: false,
        },
    },
    {
        type: 'checkbox',
        name: 'Чекбокс кнопки',
        icon: 'icon-checkboxoutline',
        options: {
            inline: false,
            defaultValue: [],
            showLabel: false,
            name: 'checkbox',
            options: [
                {
                    value: 'Option 1',
                },
                {
                    value: 'Option 2',
                },
                {
                    value: 'Option 3',
                },
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label',
            },
            remoteFunc: '',
            disabled: false,
        },
    },
    {
        type: 'slider',
        name: 'Слайдер',
        icon: 'icon-sliders-h',
        options: {
            defaultValue: 0,
            disabled: false,
            required: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false,
            range: false,
            width: '',
        },
    },
    {
        type: 'button',
        name: 'Кнопка',
        icon: 'icon-mtbutton',
        options: {
            defaultValue: 'Отправить'
        },
    },
];
