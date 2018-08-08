//
//  LivenessResult.h
//  Au10tix
//
//  Created by Rustem on 30.11.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

/**
 * This class contains liveness results
 */


#ifndef LivenessResult_h
#define LivenessResult_h

#import <AVFoundation/AVFoundation.h>

@interface LivenessResult: NSObject
- (NSDictionary *)toDictionary;

@property int ErrorCode;
@property int percent;
@property int BinaryPattern;
@property int ColorRange;
@property int OpticalFlow;
@property int ContextArtefact;
//@property NSMutableData *log;

@end

#endif /* LivenessResult_h */
