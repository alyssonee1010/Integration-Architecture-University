package org.hbrs.mongodb.test;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.hbrs.ia.model.SalesMan;
import org.bson.Document;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HighPerformanceTest {

    private static MongoClient client;
    private MongoDatabase supermongo;
    private MongoCollection<Document> salesmen;

    @BeforeAll
    static void open() {
        client = MongoClients.create("mongodb://localhost:27018");
    }

    @AfterAll
    static void close() {
        if (client != null) client.close();
    }
    
    @BeforeEach
    void setUp() {
         supermongo = client.getDatabase("highperformanceNewTest");
        salesmen = supermongo.getCollection("salesmen");
        // Start clean per test
        salesmen.drop();
    }

    @Test
    void insertSalesMan() {
        // CREATE (Storing) the salesman object
        Document document = new Document();
        document.append("firstname" , "Sascha");
        document.append("lastname" , "Alda");
        document.append("sid" , 90133);

        // ... now storing the object
        salesmen.insertOne(document);

        // READ (Finding) the stored Documnent
        Document newDocument = this.salesmen.find().first();
        System.out.println("Printing the object (JSON): " + newDocument );

        // Assertion
        Integer sid = (Integer) newDocument.get("sid");
        assertEquals( 90133 , sid );

        // Deletion
        salesmen.drop();
    }

    @Test
    void insertSalesManMoreObjectOriented() {
        // CREATE (Storing) the salesman business object
        // Using setter instead
        SalesMan salesMan = new SalesMan( "Leslie" , "Malton" , 90444 );

        // ... now storing the object
        salesmen.insertOne(salesMan.toDocument());

        // READ (Finding) the stored Documnent
        // Mapping Document to business object would be fine...
        Document newDocument = this.salesmen.find().first();
        System.out.println("Printing the object (JSON): " + newDocument );

        // Assertion
        Integer sid = (Integer) newDocument.get("sid");
        assertEquals( 90444 , sid );

        // Deletion
        salesmen.drop();
    }
}