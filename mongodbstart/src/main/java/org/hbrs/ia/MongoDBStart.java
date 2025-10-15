package org.hbrs.ia;

import org.hbrs.ia.code.ManagePersonal;
import org.hbrs.ia.code.ManagePersonalMongo;
import org.hbrs.ia.model.SalesMan;
import org.hbrs.ia.model.SocialPerformanceRecord;

public class MongoDBStart {

    public static void main(String[] args) {
        try (ManagePersonalMongo mpImpl = new ManagePersonalMongo()) {
            ManagePersonal mp = mpImpl;

            SalesMan s = new SalesMan("Lola", "Lelu", 2);
            mp.createSalesMan(s);

            SocialPerformanceRecord r = new SocialPerformanceRecord(
                    5, 4, 5, 4, 5, 5, s.getId(), 2025
            );
            mp.addSocialPerformanceRecord(r, s);

            SalesMan loaded = mp.readSalesMan(2);
            System.out.println("Loaded SalesMan: " + loaded.getFirstname() + " " + loaded.getLastname());

            System.out.println("All salesmen count: " + mp.readAllSalesMen().size());
            System.out.println("Social records for 2: " + mp.readSocialPerformanceRecord(s).size());
        }
    }
}
