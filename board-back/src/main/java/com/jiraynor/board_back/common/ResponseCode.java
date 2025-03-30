package com.jiraynor.board_back.common;

public interface ResponseCode {

    // HTTP Status 200
    public static final String SUCCESS = "SU";

    // HTTP Status 400
    public static final String VALIDATION_FAILED = "VF";
    public static final String DUPLICATE_FAILED = "DE";
    public static final String DUPLICATE_NICKNAME = "DN";
    public static final String DUPLICATE_TEL_NUMBER = "DT";
    public static final String NOT_EXISTED_USER = "NU";
    public static final String NOT_EXISTED_BOARD = "NB";

    // HTTP Status 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";

    // HTTP Status 401
    String NO_PERMISSION = "NP";
    // HTTP Status 500
    String DATABASE_ERROR = "DBE";

}
