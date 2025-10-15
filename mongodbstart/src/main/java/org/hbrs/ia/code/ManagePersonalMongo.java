package org.hbrs.ia.code;

import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.hbrs.ia.model.SalesMan;
import org.hbrs.ia.model.SocialPerformanceRecord;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

public class ManagePersonalMongo implements ManagePersonal, AutoCloseable {

    private final MongoClient client;
    private final MongoDatabase db;
    private final MongoCollection<Document> salesmen;
    private final MongoCollection<Document> social;

    public ManagePersonalMongo() {
        this.client = MongoClients.create("mongodb://localhost:27018");
        this.db = client.getDatabase("java_project");
        this.salesmen = db.getCollection("salesmen");
        this.social = db.getCollection("social_performance_records");
    }

    @Override
    public void createSalesMan(SalesMan record) {
        salesmen.insertOne(record.toDocument());
    }

    @Override
    public void addSocialPerformanceRecord(SocialPerformanceRecord record, SalesMan salesMan) {
        Document doc = record.toDocument();
        doc.put("sid", salesMan.getId());
        social.insertOne(doc);
    }

    @Override
    public SalesMan readSalesMan(int sid) {
        Document d = salesmen.find(Filters.eq("sid", sid)).first();
        if (d == null) return null;
        return new SalesMan(
                d.getString("firstname"),
                d.getString("lastname"),
                d.getInteger("sid")
        );
    }

    @Override
    public List<SalesMan> readAllSalesMen() {
        List<SalesMan> list = new ArrayList<>();
        try (MongoCursor<Document> cur = salesmen.find().iterator()) {
            while (cur.hasNext()) {
                Document d = cur.next();
                list.add(new SalesMan(
                        d.getString("firstname"),
                        d.getString("lastname"),
                        d.getInteger("sid")
                ));
            }
        }
        return list;
    }

    @Override
    public List<SocialPerformanceRecord> readSocialPerformanceRecord(SalesMan salesMan) {
        List<SocialPerformanceRecord> list = new ArrayList<>();
        try (MongoCursor<Document> cur = social.find(Filters.eq("sid", salesMan.getId())).iterator()) {
            while (cur.hasNext()) {
                Document d = cur.next();
                list.add(SocialPerformanceRecord.fromDocument(d));
            }
        }
        return list;
    }

    @Override
    public void updateSalesMan(SalesMan record) {
        throw new UnsupportedOperationException("Update not allowerd");
    }

    @Override
    public void deleteSalesMan(int sid) {
        salesmen.deleteOne(eq("sid", sid));
        social.deleteMany(eq("sid", sid));
    }

    @Override
    public void deleteAllSalesMen() {
        salesmen.deleteMany(new Document());
        social.deleteMany(new Document());
    }

    @Override
    public void deleteSocialPerformanceRecords(SalesMan salesMan) {
        social.deleteMany(eq("sid", salesMan.getId()));
    }

    @Override
    public void close() {
        client.close();
    }
}
