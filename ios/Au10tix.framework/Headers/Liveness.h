//
//  Liveness.h
//  Au10tix
//
//  Created by Rustem on 17.11.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

/**
 * Contains methods for Liveness detection
 */

#ifndef Liveness_h
#define Liveness_h

#import <UIKit/UIKit.h>
#import "LivenessResult.h"

@interface Liveness : NSObject
/**
 * Initializing liveness\n
 * To initialize liveness you need to transfer parametre\n
 * frameworkBundle = [NSBundle bundleForClass:[CameraCtrl class]];\n
 * bundle = [NSBundle bundleWithURL:[frameworkBundle URLForResource:@"au10tix_res" withExtension:@"bundle"]]
 */
- (id)initLiveness: (NSBundle*) bundle;



-(NSString *) livenessStepInfo: (BOOL) s;


@property NSDictionary *config;
@property NSString *uid;


@property int livenessStepMax;
@property int livenessStep;

@property int testMax;
@property int testId;
@property NSMutableArray *testData;

@property NSMutableArray *livenessData;
@property NSBundle *bundle;

@end


#endif /* Liveness_h */
