package org.hbrs.ia.model;

import org.bson.Document;

public class SocialPerformanceRecord {
    private Integer leadershipCompetence;
    private Integer opennessToEmployees;
    private Integer socialBehaviourToEmployees;
    private Integer attitudeTowardsClients;
    private Integer communicationSkills;
    private Integer integrityToCompany;
    private Integer sid;
    private Integer year;

     public SocialPerformanceRecord(
        Integer leadershipCompetence,
        Integer opennessToEmployees,
        Integer socialBehaviourToEmployees,
        Integer attitudeTowardsClients,
        Integer communicationSkills,
        Integer integrityToCompany,
        Integer sid,
        Integer year
        ) {
        this.leadershipCompetence = leadershipCompetence;
        this.opennessToEmployees = opennessToEmployees;
        this.socialBehaviourToEmployees = socialBehaviourToEmployees;
        this.attitudeTowardsClients = attitudeTowardsClients;
        this.communicationSkills = communicationSkills;
        this.integrityToCompany = integrityToCompany;
        this.sid = sid;
        this.year = year;
    }

    public Integer getId() {
        return sid;
    }
    public void setId(Integer sid) {
        this.sid = sid;
    }

    public Integer getYear() {
        return year;
    }
    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getLeadershipCompetence() {
        return leadershipCompetence;
    }
    public void setLeadershipCompetence(Integer leadershipCompetence) {
        this.leadershipCompetence = leadershipCompetence;
    }

      public Integer getOpennessToEmployees() {
        return opennessToEmployees;
    }
    public void setOpennessToEmployees(Integer opennessToEmployees) {
        this.opennessToEmployees = opennessToEmployees;
    }

    public Integer getSocialBehaviourToEmployees() {
        return socialBehaviourToEmployees;
    }
    public void setSocialBehaviourToEmployees(Integer socialBehaviourToEmployees) {
        this.socialBehaviourToEmployees = socialBehaviourToEmployees;
    }

    public Integer getAttitudeTowardsClients() {
        return attitudeTowardsClients;
    }
    public void setAttitudeTowardsClients(Integer attitudeTowardsClients) {
        this.attitudeTowardsClients = attitudeTowardsClients;
    }

    public Integer getCommunicationSkills() {
        return communicationSkills;
    }
    public void setCommunicationSkills(Integer communicationSkills) {
        this.communicationSkills = communicationSkills;
    }

    public Integer getIntegrityToCompany() {
        return integrityToCompany;
    }
    public void setIntegrityToCompany(Integer integrityToCompany) {
        this.integrityToCompany = integrityToCompany;
    }

    public Document toDocument() {
        org.bson.Document document = new Document();
        document.append("sid" , this.sid);
        document.append("leadershipCompetence" , this.leadershipCompetence );
        document.append("opennessToEmployees" , this.opennessToEmployees );
        document.append("socialBehaviourToEmployees" , this.socialBehaviourToEmployees );
        document.append("attitudeTowardsClients" , this.attitudeTowardsClients );
        document.append("communicationSkills" , this.communicationSkills );
        document.append("integrityToCompany" , this.integrityToCompany );
        document.append("year" , this.year );
        return document;
    }

    public static SocialPerformanceRecord fromDocument(Document d) {
        return new SocialPerformanceRecord(
            d.getInteger("leadershipCompetence"),
            d.getInteger("opennessToEmployees"),
            d.getInteger("socialBehaviourToEmployees"),
            d.getInteger("attitudeTowardsClients"),
            d.getInteger("communicationSkills"),
            d.getInteger("integrityToCompany"),
            d.getInteger("sid"),
            d.getInteger("year")
        );
    }
}
