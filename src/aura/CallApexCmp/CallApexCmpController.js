({
	doInit : function(component, event, helper) {

        // get reference to our apex method
        var action = component.get('c.sayHello');
        
        // set parameters for our apex method
        action.setParams({
            'leadId' : component.get('v.recordId')
        });
        
        // method is invoked asynchronously, in concept like <apex:actionFunction> in visualforce
        // so we setup a callback to receive the server response
        action.setCallback( this, function( response ) {
            
            // check that component is still valid (hasn't been destroyed, user hasn't navigated to other page)
            // and that server response was success
            if ( component.isValid() && response.getState() === 'SUCCESS' ) {
               
                // alert(message);
                $A.get('e.force:showToast').setParams({
                    'title' : 'Success!',
                    'message' : response.getReturnValue()
                }).fire();

                // window.location.reload(); -- don't use it, https://trailhead.salesforce.com/lex_dev_visualforce/lex_dev_visualforce_navigation
                $A.get('e.force:refreshView').fire();
                
                // since refresh doesn't do a full page reload
                // the quick action modal component is still rendered
                // so we need to dismiss it
                $A.get('e.force:closeQuickAction').fire();
                
            } else {
                console.error( 'error saying hello' );
            }
            
        });
        
        $A.enqueueAction( action );

        // learn more about calling server-side functions:
		// https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/controllers_server_actions_call.htm
        
	}
})