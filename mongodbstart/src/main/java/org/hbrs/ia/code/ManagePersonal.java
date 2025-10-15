package org.hbrs.ia.code;

import java.util.List;
import org.hbrs.ia.model.SalesMan;
import org.hbrs.ia.model.SocialPerformanceRecord;
/**
 * Code lines are commented for suppressing compile errors.
 * Are there any CRUD-operations missing?
 */
public interface ManagePersonal {
    public void createSalesMan( SalesMan record );

    public void addSocialPerformanceRecord(SocialPerformanceRecord record , SalesMan salesMan );
    // Remark: an SocialPerformanceRecord corresponds to part B of a bonus sheet

    public SalesMan readSalesMan( int sid );

    public List<SalesMan> readAllSalesMen();

    public List<SocialPerformanceRecord> readSocialPerformanceRecord( SalesMan salesMan );
    // Remark: How do you integrate the year?
    
    void updateSalesMan(SalesMan record);
    void deleteSalesMan(int sid);
    void deleteAllSalesMen();
    void deleteSocialPerformanceRecords(SalesMan salesMan);
}
