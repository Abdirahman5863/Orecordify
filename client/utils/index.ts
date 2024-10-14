type OrderFormData = {
    orderDescription: string;
    status: string;
    total: number;
  };
export const intiallFormData:OrderFormData = {
    
    orderDescription: '',
    status: '',
    total: 0,
}
type FormControl = {
    name: keyof OrderFormData; // Name should correspond to a key in OrderFormData
    label: string;
    type: string;
    placeholder: string;
  };
export const adddorderformDatacontrols:FormControl[] = [
    
    {
        name: 'orderDescription',
        label: 'orderDescription',
        type: 'text',
        placeholder: 'orderDescription',
    },
    {
        name: 'status',
        label: 'status',
        type: 'text',
        placeholder: 'status',
    },
    {
        name: 'total',
        label: 'total',
        type: "number",
        placeholder: 'total',   
    }]
    type customerFormData = {
        customer_name:string,
        customer_phone:string,
        customer_email:string

      };
    export const intialcustomerFormData:customerFormData = {
    
        
        customer_name: '',
        customer_phone:'',
        customer_email:'',

    }
    type FormcustomerControl = {
        name: keyof customerFormData; // Name should correspond to a key in OrderFormData
        label: string;
        type: string;
        placeholder: string;
      };
    export const addcustomerformDatacontrols:FormcustomerControl[] = [
    
        {
            name: 'customer_name',
            label: 'customer_name',
            type: 'text',
            placeholder: 'customer_name',

        },
        {
            name: 'customer_phone',
            label: 'customer_phone',
            type: 'string',
            placeholder: 'customer_phone',
        },
        {
            name: 'customer_email',
            label: 'customer_email',
            type: 'text',
            placeholder: 'customer_email',
        },
    ]