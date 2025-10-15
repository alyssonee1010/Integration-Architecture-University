package org.hbrs.ia.code;

import java.util.List;
import org.hbrs.ia.model.SalesMan;
import org.hbrs.ia.model.SocialPerformanceRecord;
/**
 * Code lines are commented for suppressing compile errors.
 * Are there any CRUD-operations missing? Delete and Update
 */
public interface ManagePersonal {
    public void createSalesMan( SalesMan record );

    public void addSocialPerformanceRecord(SocialPerformanceRecord record , SalesMan salesMan );

    public SalesMan readSalesMan( int sid );

    public List<SalesMan> readAllSalesMen();

    public List<SocialPerformanceRecord> readSocialPerformanceRecord( SalesMan salesMan );
    // Remark: How do you integrate the year? Just add to the PerformanceRecord
    
    void updateSalesMan(SalesMan record);
    void deleteSalesMan(int sid);
    void deleteSocialPerformanceRecords(SalesMan salesMan);
}
