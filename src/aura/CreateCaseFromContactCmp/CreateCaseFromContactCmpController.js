({
	doInit : function(component, event, helper) {
		
        var action = component.get('c.getContact');
        
        action.setParams({
            'contactId' : component.get('v.recordId')
        });
        
        action.setCallback( this, function( response ) {
			if ( component.isValid() && response.getState() === 'SUCCESS' ) {
                
                var contact = response.getReturnValue();
                
                var newCase = {
                    'sobjectType' : 'Case',
                    'Subject' : 'New Case from Lightning Component',
                    'Status' : 'New',
                    'Origin' : 'Web',
                    'ContactId' : contact.Id,
                    'AccountId' : contact.AccountId
                }
                
                component.set( 'v.case', newCase );
                
            } else {
                console.error( 'error getting contact' );
            }
        });
        
        $A.enqueueAction( action );
               
	},
    
    handleSave : function(component, event, helper) {

        var action = component.get('c.saveCase');
        
        action.setParams({
            'theCase' : component.get( 'v.case' )
        });
        
        action.setCallback( this, function( response ) {
			if ( component.isValid() && response.getState() === 'SUCCESS' ) {
                
                component.set( 'v.case', response.getReturnValue() );
                
                $A.get("e.force:showToast").setParams({
                    'type' : 'success',
                    'title' : 'Success!',
                    'message' : 'The case has been created successfully.'
                }).fire();
                
                $A.get('e.force:refreshView').fire();
                
                $A.get('e.force:closeQuickAction').fire();
                
            } else {
                
                $A.get("e.force:showToast").setParams({
                    'type' : 'error',
                    'title' : 'Error',
                    'message' : 'Sorry, errors trying to save case'
                }).fire();    
                
            }
        });
        
        $A.enqueueAction( action );
        
    },
    
    handleCancel : function(component, event, helper) {
        
        $A.get('e.force:closeQuickAction').fire();
        
    }
    
})