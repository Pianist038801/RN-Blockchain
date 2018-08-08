#import "React/RCTBridgeModule.h"
#import "Au10tix/Au10tix.h"
#import <UIKit/UIKit.h>

@interface RNAu10tix : NSObject <RCTBridgeModule, CameraCallback>
@property (strong, nonatomic) CameraCtrl* Au10tixCamera;
@end
