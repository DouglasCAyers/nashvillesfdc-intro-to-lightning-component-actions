global class CallApexController {

    // webservice keyword to expose to JavaScript
    // can only exist in global classes
    // must be static
    // ---------------------------------------------------------------
    
    webservice static String sayGreeting( String name ) {
        return 'Greetings, ' + name;
    }
     
    
    
    // AuraEnabled annotation to expose to lightning components
    // can exist in global or public classes
    // must be static
    // ---------------------------------------------------------------

    @AuraEnabled
    public static String sayHello( ID leadId ) {
        Lead lead = [ SELECT name FROM Lead WHERE id = :leadId ];
        return 'Hello, ' + lead.name;
    }
    
}