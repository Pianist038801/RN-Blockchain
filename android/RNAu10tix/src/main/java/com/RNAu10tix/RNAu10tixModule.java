package com.RNAu10tix;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.provider.MediaStore;
import android.util.Base64;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.senticore.au10tix.sdk.algorithms.FindCorners;
import com.senticore.au10tix.sdk.algorithms.FindFace;
import com.senticore.au10tix.sdk.algorithms.Liveness;
import com.senticore.au10tix.sdk.algorithms.Quadrangle;
import com.senticore.au10tix.sdk.image.ImageContainer;
import com.senticore.au10tix.sdk.image.jpeg.JpegImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.RuntimeException;


public class RNAu10tixModule extends ReactContextBaseJavaModule {

    private static Callback callback;
    public static String currentPhotoPath;
    public static final int RC_TAKE_PHOTO = 212;

    public RNAu10tixModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAu10tix";
    }

    @ReactMethod
    public void launchCamera(String type, Callback callback) {
        DataHolder.getHolder().setImageType("face".equals(type) ? "face" : "document");
        this.callback = callback;
        final Activity currentActivity = getCurrentActivity();
        File file;
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        file = new File(currentActivity.getExternalCacheDir(),
            "temp_photo.jpg");
        if (file.exists()) {
            file.delete();
        }
        Uri fileUri = Uri.fromFile(file);
        currentPhotoPath = file.getAbsolutePath();
        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
        currentActivity.startActivityForResult(intent, RC_TAKE_PHOTO);
    }



    public static class PhotoWorkerTask extends AsyncTask<JpegImage, byte[], DataHolder> {
        Context mParentActivityContext;
        boolean isShowResult = false;
        boolean callbackWasCalled = false;

        public PhotoWorkerTask(Context context) {
            mParentActivityContext = context;
        }

        @Override
        protected DataHolder doInBackground(JpegImage... params) {
            JpegImage photo = params[0];

            DataHolder holder = DataHolder.getHolder();

            ImageContainer container = ImageContainer.getContainerFromJpeg(photo);

            holder.setContainer(container);

            Quadrangle quadrangle = null;
            if ("document".equals(holder.getImageType())) {
                FindCorners findCorners = new FindCorners(container);
                FindCorners.Result result = findCorners.find();
                quadrangle = result.getQuadrangle();
                holder.setImageType("document");
            }
            if ("face".equals(holder.getImageType())) {
                FindFace findFace = new FindFace(container);
                FindFace.Result result = findFace.find();
                quadrangle = result.getQuadrangle();
                holder.setImageType("face");
                Liveness live = new Liveness();
                int error = live.Step(container, 0);
                if (error == Liveness.LV_OK) {
                    holder.setContainer(container);
                    holder.setImageType("livenessStep1");
                } else {
                    return null;
                }
            }
            if (quadrangle != null) {
                holder.setQuadrangle(quadrangle);
            }

            holder.setPhoto(ImageContainer.getJpegPhoto(container));

            isShowResult = true;
            return holder;
        }

        @Override
        protected void onPostExecute(DataHolder result) {
            super.onPostExecute(result);
            if (callbackWasCalled) return;
            callbackWasCalled = true;
            try {
                if( result == null ){
                    callback.invoke("Not found", null);
                } else {
                    callback.invoke(null, getBase64StringFromFile(RNAu10tixModule.currentPhotoPath));
                }
            } catch (RuntimeException e){
                System.out.println("I caught: " + e);
            }
            
        }

        private String getBase64StringFromFile(String absoluteFilePath) {
            InputStream inputStream = null;
            try {
                inputStream = new FileInputStream(new File(absoluteFilePath));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }

            byte[] bytes;
            byte[] buffer = new byte[8192];
            int bytesRead;
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            try {
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    output.write(buffer, 0, bytesRead);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            bytes = output.toByteArray();
            return Base64.encodeToString(bytes, Base64.NO_WRAP);
        }

    }

    static {
        System.loadLibrary("aunl");
    }
}