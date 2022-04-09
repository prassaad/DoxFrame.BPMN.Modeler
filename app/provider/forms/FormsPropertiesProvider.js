// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "Form Key" property.
import formKeyProps from './parts/FormKeyProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;


/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function FormsPropertiesProvider(propertiesPanel, translate) {

  // API ////////

  /**
   * Return the groups provided for the given element.
   *
   * @param {DiagramElement} element
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  this.getGroups = function(element) {

    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return function(groups) {

      // Add the "forms" group
	if(is(element, 'bpmn:StartEvent') || is(element, 'bpmn:UserTask') ) {
        groups.push(createFormsGroup(element, translate));
      }

      return groups;
    }
  };


  // registration ////////

  // Register our custom camunda properties provider.
  // Use a lower priority to ensure it is loaded after
  // the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

FormsPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];

// Create the custom forms group
function createFormsGroup(element, translate) {

  // create a group called "Forms".
  const formsGroup = {
    id: 'forms',
    label: translate('Forms'),
    entries: formKeyProps(element)
  };

  return formsGroup
}
