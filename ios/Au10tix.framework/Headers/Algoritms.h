#ifndef Algoritms_h
#define Algoritms_h

#import "Quadrangle.h"
#import "FindCornersResult.h"
#import "FindFaceResult.h"
#import "FindBarcodeResult.h"
#import "TransformResult.h"
#import "LivenessResult.h"
#import "BitmapContainer.h"

#define OK 1
#define FLASH 10
#define DARK 100
#define FOUND_QUADRANGLE 1000

#define LV_OK 0
#define LV_NOFACE 1
#define LV_NOPHOTO 2
#define LV_ORIENTATION 4
#define LV_NOSVM 8
#define LV_FACETOOLARGE 16
#define LV_FLOWBAD 32
#define LV_FLOWTIMEOUT 64
#define LV_OUTOFFOCUS 128
#define LV_ZOOMIN 256
#define LV_FACESTATIC 512

#define FF_OK 1
#define FF_NOFACE 2

#define BC_TYPE_CODE128 1
#define BC_TYPE_PDF417  2
/**
 * This class contains the main static methods of work with the image
 */
@interface Algoritms : NSObject

/**
 * Get SDK version
 */
+(NSString*) getVersionSDK;


/**
 * Get NativeLib Version
 */
+(NSString*) getVersionNativeLib;


/**
 * This algorithm searches a barcode on a provided image.\n
 * If a barcode is found, the alogorithm returns NSMurableArray which contains FindBarcodeResult.
 * @return Returns the object which contains results of image processing
 * @see FindBarcodeResult
 */
+ (NSMutableArray*) findBarcode : (id<BitmapContainer>) container;


/**
 * This algorithm looks for a document on the provided image.
 * If the document is found, the returned result class will contain a quadrangle.
 *
 * @param container - instance of BitmapContainer class.
 * @return Returns the object which contains result of image processing
 *
 * @see BitmapContainer
 * @see FindCornersResult
 */
+ (FindCornersResult *) findCorners: (id <BitmapContainer>) container;


/**
 *  The transformation algorithm uses the coordinates (four vertices), for example, a quadrangle,
 *  received as the result of document finding algorithm for croping, rotating and
 *  restoring the projection (of a found image).
 *
 *  The received fragment is transformed into a rectangle.
 *
 * @param container - instance of BitmapContainer class.
 * @param in_corners - object of coordinates.
 * @return - id <BitmapContainer>
 *
 * @see TransformResult
 * @see BitmapContainer
 * @see Quadrangle
 */
+ (TransformResult *) transformData: (id <BitmapContainer>) container in_corners:(Quadrangle *) in_corners;



/**
 * This algorithm looks for a face on the provided image.
 * If a face is found, the returned class of result will contain a rectangle.
 * @param container - instance of BitmapContainer class
 * @return Returns "FindCorners.Result" which contains result of image processing
 *
 * @see BitmapContainer
 * @see FindFaceResult
 */
+ (FindFaceResult*) findFace: (id <BitmapContainer>) container;



/**
 *  Algorithm of step-by-step liveness detection for an object (a human) on camera.\n
 *  To start the algorithm, call in turn \n
 *  livenessStep with BitmapContainer - container with image step = 0\n
 *  livenessStep with BitmapContainer - container with image step = 1\n
 *  Returns successfull/ not succesfull result.\n
 *  if every step returns 0 then image data are saved to NSMutableArray and send to livenessFinal\n
 *
 *  @param step - number of the sent image
 *
 * @return Returns true or false of process
 * @see BitmapContainer
 */
+ (int) livenessSteps: (id <BitmapContainer>) container step: (int)step;



/**
 *  Final algorithm of a step-by-step liveness detedction for the object (a human) on camera
 *  @param images - NSMutableArray with 2 successfull livenessSteps images in BitmapContainer format
 *
 *  @see LivenessResult
 *  @return LivenessResult - the returned structure with results
 */

+ (LivenessResult *) livenessFinal: (NSMutableArray*) images;


/**
 * Crop the image to the coordinates
 * @param container - instance of BitmapContainer class
 * @param x y - start crop point coordinates
 * @param width - crop area width
 * @param height - crop area height
 * @return - id <BitmapContainer> containing cropped image
 */
+ (id <BitmapContainer>) crop: (id <BitmapContainer>) container x: (int)x y: (int)y width: (int)width height: (int)height;

@end


#endif /* Algoritms_h */
