package com.texteditorapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import io.tradle.react.LocalAuthPackage;
import com.pomocorp.rnimagetools.RNImageToolsPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.adobe.creativesdk.foundation.AdobeCSDKFoundation;
import com.adobe.creativesdk.foundation.auth.IAdobeAuthClientCredentials;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication, IAdobeAuthClientCredentials {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new ReactVideoPackage(),
            new WebViewBridgePackage(),
            new SplashScreenReactPackage(),
            new MapsPackage(),
            new LocalAuthPackage(),
            new RNImageToolsPackage(),
            new ImagePickerPackage(),
            new RNDeviceInfo(),
            new WebViewBridgePackage()
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
    SoLoader.init(this, /* native exopackage */ false);
    //MultiDex.install(getBaseContext());
    AdobeCSDKFoundation.initializeCSDKFoundation(getApplicationContext());
  }

@Override
        public String getClientID() {
            return "0f422a10a7b6402ba57385aafc1c57b3";
        }

        @Override
        public String getClientSecret() {
            return "40093c0e-d2ce-4f41-8b9d-3f341fc38f89";
        }

        @Override
        public String getRedirectURI() {
            return "ams+39c7f83963f692c4e7a5cccbc3dc1a461481169e://adobeid/0f422a10a7b6402ba57385aafc1c57b3";
        }

        @Override
        public String[] getAdditionalScopesList() {
            return new String[]{"email", "profile", "address"};
        }
}
