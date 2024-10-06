package data.entities;

public enum CertificateType {

    PERMISSION_OF_PRINTING("Permission of Printing"),
    CCC_CERTIFICATE("CCC certificate");

    private final String displayName;

    CertificateType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}