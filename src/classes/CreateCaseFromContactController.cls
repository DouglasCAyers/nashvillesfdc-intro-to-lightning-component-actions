public with sharing class CreateCaseFromContactController {

    @AuraEnabled
    public static Contact getContact( ID contactId ) {
        
        System.debug( 'getting contact by id: ' + contactId );
        
        List<Contact> contacts = new List<Contact>([
            SELECT id, accountId FROM Contact WHERE id = :contactId
        ]);
        
        return ( contacts.size() > 0 ) ? contacts[0] : null;
    }
    
    @AuraEnabled
    public static Case saveCase( Case theCase ) {
        
        System.debug( 'upserting case: ' + theCase );
        
        try {

        	upsert theCase;
            return theCase;
            
        } catch ( Exception e ) {
            
            System.debug( LoggingLevel.ERROR, e.getMessage() + ' : ' + e.getStackTraceString() );
            throw e;
            
        }

    }
    
}