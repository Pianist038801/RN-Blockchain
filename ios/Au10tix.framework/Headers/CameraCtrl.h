#import <UIKit/UIKit.h>
#import "Liveness.h"



/**
 * Protocol for working with camera
 */
@protocol CameraCallback <NSObject>


/**
 * cameraSuccess delegate which allows to get the image at clicking camera's photo button and meta data
 */
-(void) cameraSuccess: (CMSampleBufferRef) buffer metadata:(NSDictionary*) metadata;

/**
 * cameraSuccess delegate which allows to get the error code if camera fails
 */
-(void) cameraError:(NSString *) text;

/**
 * cameraSuccess delegate which allows to get the image from camera in real-time mode
 */
-(void) cameraPreview: (CMSampleBufferRef) buffer;
@end

/**
 *  Class for working with camera layer
 */
@interface CameraCtrl : UIViewController <UIImagePickerControllerDelegate, UINavigationControllerDelegate> {
    id<CameraCallback> _delegate;
}

/**
 * method for setting a delegate
 */
- (void)setDelegate:(id <CameraCallback>)delegate;


/**
 *  Method of processing of taking photo
 */
-(IBAction) takePhotoButtonPressed:(id)sender forEvent:(UIEvent*)event;


/**
 *  Method of processing of turn to front/back side of camera
 */
-(IBAction) turnCameraButtonPressed:(id)sender forEvent:(UIEvent*)event;

/**
 
 *  Method for close camera
 */
-(IBAction) closeCameraButtonPressed:(id)sender forEvent:(UIEvent*)event;

/**
 * Camera initialization method with params
 * @param xibName - custom layer name (.xib file name, but without extension) or nil (using default .xib file)
 * @param cameraType - camera side (front / back)
 */
- (id)initCamera: (NSString*) xibName cameraType:(NSString*)cameraType;

/**
 * Method of checking access to the camera - if no access - get alert window with 2 buttons (ok / go to settings)
 */
-(BOOL) checkCameraAccess;

/**
 * method for stopping camera
 */
-(void) cameraClose;

/**
 * Method for convert points для проекции с камеры на экран дисплея
 */
-(CGPoint) convertPoints:(CGPoint) inPoint;




@property NSString *cameraType;
@property AVCaptureDevice *videoDevice;
@property AVCaptureSession *captureSession;
@property dispatch_queue_t captureSessionQueue;
@property(nonatomic, retain) AVCaptureStillImageOutput *stillImageOutput;
@property(nonatomic, retain) AVCaptureVideoDataOutput *videoDataOutput;
@property CGRect videoRect;
@property CGSize captureImageSize;
@property AVCaptureVideoPreviewLayer *previewLayer;
@property (weak, nonatomic) IBOutlet UIView *flashLayer;

@property NSTimer *timer;
@property Liveness* livenessObj;
@property CMSampleBufferRef firstImage;

@property (weak, nonatomic) IBOutlet UITextView *messageField2;
@property (weak, nonatomic) IBOutlet UIButton *takePhoto;
@property (weak, nonatomic) IBOutlet UIView *cameraLayer;
@property (weak, nonatomic) IBOutlet UILabel *timeLabel;
@property int milliseconds;


@property BOOL livenessProcess;
@property BOOL inProgress;
@property BOOL livenessInProgress;
@property NSTimeInterval nextProcessingTime;
@property BOOL catchFirstPhoto;


@property NSString* sessionID;

@end
