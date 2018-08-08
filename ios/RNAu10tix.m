#import "RNAu10tix.h"

@interface RNAu10tix () {
@private NSString *cameraType;
@private RCTResponseSenderBlock callback;
@private FindFaceResult *ffaceResult;
@private FindCornersResult *fcornersResult;
@private TransformResult* transformRes;
}
@end

@implementation RNAu10tix

RCT_EXPORT_MODULE();

-(void) cameraError:(NSString *) text{
  [self.Au10tixCamera.captureSession stopRunning];
}

-(void) cameraPreview: (CMSampleBufferRef) buffer{
}

-(void) findLivenessSearch : (id<BitmapContainer>) ppContainer1 : (NSDictionary*) metadata{
  LivenessResult* livenessResult = [metadata valueForKey:@"liveness"];
  if ( livenessResult.percent > 0 ){
    NSData* imgDate = [BitmapContainerHelper toJpeg:ppContainer1];
    self->callback(@[[NSNull null], [imgDate base64EncodedStringWithOptions:0]]);
  } else {
    self->callback(@[@"Error", [NSNull null]]);
  }
}

-(void) findFaceSearch: (id<BitmapContainer>) ppContainer{
  [BitmapContainerHelper rotate:ppContainer angle:90];
  FindFaceResult* findFaceResult = [Algoritms findFace: ppContainer ];
  if (findFaceResult.ok){
    id<BitmapContainer> cropContainer = nil;
    cropContainer = [Algoritms crop:ppContainer
                                  x:[findFaceResult.quadrangle.a.x intValue]
                                  y:[findFaceResult.quadrangle.a.y intValue]
                              width:[findFaceResult.quadrangle.c.x intValue] - [findFaceResult.quadrangle.a.x intValue]
                             height:[findFaceResult.quadrangle.c.y intValue] - [findFaceResult.quadrangle.a.y intValue] ];
    NSData* imgDate = [BitmapContainerHelper toJpeg:cropContainer];
    self->callback(@[[NSNull null], [imgDate base64EncodedStringWithOptions:0]]);
  } else {
    self->callback(@[@"Error", [NSNull null]]);
  }
}

-(void) findDocSearch : (id<BitmapContainer>) ppContainer{
  [BitmapContainerHelper rotate:ppContainer angle:90];
  fcornersResult = [Algoritms findCorners: ppContainer];
  if (fcornersResult.ok){
    transformRes = [Algoritms transformData:ppContainer in_corners:fcornersResult.quadrangle];
    NSData* imgDate = [BitmapContainerHelper toJpeg:transformRes.container];
    self->callback(@[[NSNull null], [imgDate base64EncodedStringWithOptions:0]]);
  } else {
    self->callback(@[@"Error", [NSNull null]]);
  }
}

-(void) cameraSuccess:(CMSampleBufferRef)buffer metadata:(NSDictionary *)metadata{
  id<BitmapContainer> ppContainer = [BitmapContainerHelper createBitmapContainer];
  [BitmapContainerHelper initFromBuffer: ppContainer buffer: buffer];
  if ([cameraType isEqual: @"face"]) {
    [self findFaceSearch:ppContainer];
  } else if ([cameraType isEqual: @"doc"]) {
    [self findDocSearch:ppContainer];
  } else if ([cameraType isEqual: @"face_liveness"]) {
    [self findLivenessSearch:ppContainer:metadata];
  }
}

RCT_EXPORT_METHOD(launchCamera: (NSString *)type
                  callback:(RCTResponseSenderBlock)callback
                  ){
  cameraType = type;
  self->callback = callback;
  dispatch_async(dispatch_get_main_queue(), ^{
    self.Au10tixCamera = [[CameraCtrl alloc] initCamera:nil cameraType:type];
    [self.Au10tixCamera setDelegate: self];
    UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    while (root.presentedViewController != nil) {
      root = root.presentedViewController;
    }
    [root presentViewController:self.Au10tixCamera animated:YES completion:nil];
  });
}

@end
