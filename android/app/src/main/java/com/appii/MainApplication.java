package com.appii;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.slowpath.actionsheet.ActionSheetPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.peel.react.rnos.RNOSModule;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.RNAu10tix.RNAu10tixPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
            new RNDeviceInfo(),
            new ActionSheetPackage(),
            new ReactNativeOneSignalPackage(),
            new ReactNativePushNotificationPackage(),
            new RNOSModule(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new RandomBytesPackage(),
            new KeychainPackage(),
            new RNAu10tixPackage(),
            new FabricPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
