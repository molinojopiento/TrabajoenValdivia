package com.camden.trabajovaldivia;

import org.apache.cordova.*;
import android.os.Bundle;

public class TrabajoValdiviaActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
