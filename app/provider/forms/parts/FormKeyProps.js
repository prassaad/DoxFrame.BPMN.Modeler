import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel'

export default function(element) {

  return [
    {
      id: 'formKey',
      component: <FormKey id="formKey" element={ element } />,
      isEdited: isTextFieldEntryEdited
    }
  ];
}

function FormKey(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.formKey || '';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      formKey: value
    });
  }

  return <TextFieldEntry
    id={ id }
    element={ element }
    description={ translate('Apply a DoxFrame Form key') }
    label={ translate('Form Key') }
    getValue={ getValue }
    setValue={ setValue }
    debounce={ debounce }
  />
}
