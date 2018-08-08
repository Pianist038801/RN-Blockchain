package com.RNAu10tix;

import com.senticore.au10tix.sdk.algorithms.Liveness;
import com.senticore.au10tix.sdk.algorithms.Quadrangle;
import com.senticore.au10tix.sdk.image.ImageContainer;
import com.senticore.au10tix.sdk.image.jpeg.JpegImage;

/**
 * Created by senticorelab on 27/05/16.
 */
public class DataHolder {

    private static final DataHolder holder = new DataHolder();
    private JpegImage photo;
    private Quadrangle quadrangle;
    private ImageContainer container;
    private String imageType;
    private Liveness.Result liveResult;

    public static DataHolder getHolder() {
        return holder;
    }

    private DataHolder() { }

    public void setLivenessResult(Liveness.Result liveResult) { this.liveResult = liveResult;};
    public Liveness.Result getLivenessResult() { return this.liveResult;};

    public JpegImage getPhoto() {
        return photo;
    }

    public void setPhoto(JpegImage photo) {
        this.photo = photo;
    }

    public Quadrangle getQuadrangle() { return quadrangle;    }

    public void setQuadrangle(Quadrangle quadrangle) {
        this.quadrangle = quadrangle;
    }

    public ImageContainer getContainer() {        return container;    }

    public void setContainer(ImageContainer container) {
        this.container = container;
    }

    public String getImageType() {        return imageType;    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("DataHolder{");
        sb.append("photo=").append(photo);
        sb.append(", quadrangle=").append(quadrangle);
        sb.append(", container=").append(container);
        sb.append(", imageType='").append(imageType).append('\'');
        sb.append(", liveResult=").append(liveResult);
        sb.append('}');
        return sb.toString();
    }
}
