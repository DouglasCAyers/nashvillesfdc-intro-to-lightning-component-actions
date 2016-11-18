public with sharing class LeadActionController {
    
    private ApexPages.StandardSetController stdController;
    
    public LeadActionController( ApexPages.StandardSetController stdController ) {
        this.stdController = stdController;
    }
    
    public PageReference toggleCase() {
        
        // query selected records so can inspect field values.
        List<Lead> selectedRecords = new List<Lead>([
            SELECT
            	id, firstName, lastName
           	FROM
            	Lead
           	WHERE
            	id IN :this.stdController.getSelected()
       	]);
        
        if ( selectedRecords.size() > 0 ) {
            
            for ( Lead record : selectedRecords ) {
                
                // do something with the selected records...
                // this toggles the case of the first/last names.
                if ( record.firstName.isAllLowerCase() ) {
                    record.firstName = record.firstName.toUpperCase();
                    record.lastName = record.lastName.toUpperCase();
                } else {
                    record.firstName = record.firstName.toLowerCase();
                    record.lastName = record.lastName.toLowerCase();
                }
                
            }
 
            // update the controller's reference of selected records
            // so that when we call the save method the update applies
            // our desired changes.
            this.stdController.setSelected( selectedRecords );
            
            // we use the controller's save method because we
            // want to use its built-in page reference that will
            // navigate the user back to the original page.
            return this.stdController.save();
            
        }
        
        // if no selected records then cancel operation.
        // this method will navigate user back to original page.
        return this.stdController.cancel();
    }
    
}