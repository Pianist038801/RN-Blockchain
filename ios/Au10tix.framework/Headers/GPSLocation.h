#import <CoreLocation/CoreLocation.h>

#ifndef GPSLocation_h
#define GPSLocation_h

/**
 * Class for getting gps data from device (latitude, longitude, altitude, timestamp)
 */

@interface GPSLocationManager : NSObject<CLLocationManagerDelegate>
{
    CLLocationManager *locationManager;
    NSDictionary *gps;
}
@property(nonatomic,retain)CLLocationManager *locationManager;
@property(nonatomic,readwrite)NSDictionary* gps;

+ (GPSLocationManager *) getInstance;

/**
 * output of a popping up window
 * title - title of message
 * msg - message
 * cbt - left button text
 * obt - right button text
 */
- (void) alertPopup: title msg: (NSString *)msg cbt: (NSString *)cbt obt:(NSString *)obt tag:(NSInteger *) tag;

/**
 * start updating location
 */

- (void)startUpdatingLocation;

/*
 * stop updating location
 */
- (void)stopUpdatingLocation;

@end

#endif /* GPSLocation_h */
