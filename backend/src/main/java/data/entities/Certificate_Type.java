package data.entities;

public enum Certificate_Type {

    PERMISSION_OF_PRINTING("Permission of Printing"),
    CCC_CERTIFICATE("CCC Certificate");

    private final String displayName;
    Certificate_Type(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
    @Override
    public String toString() {
        return displayName;
    }
}
