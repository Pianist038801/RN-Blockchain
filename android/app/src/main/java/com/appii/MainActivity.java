package com.appii;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import com.RNAu10tix.RNAu10tixModule;
import com.RNAu10tix.RNAu10tixModule.PhotoWorkerTask;
import com.facebook.react.ReactFragmentActivity;
import com.senticore.au10tix.sdk.image.jpeg.JpegImage;
import java.io.ByteArrayOutputStream;

public class MainActivity extends ReactFragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "appii";
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 212 && resultCode == -1) {
            Bitmap image = BitmapFactory.decodeFile(RNAu10tixModule.currentPhotoPath);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            image.compress(CompressFormat.JPEG, 100, bos);
            byte[] imageBytes = bos.toByteArray();
            JpegImage jpegImage = new JpegImage(image.getWidth(), image.getHeight(), imageBytes);
            new PhotoWorkerTask(this).execute(jpegImage);
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}
