
import os
SPARK_HOME = "/opt/spark" # Set this to wherever you have compiled Spark
os.environ["SPARK_HOME"] = SPARK_HOME # Add Spark path
os.environ["SPARK_LOCAL_IP"] = "127.0.0.1" # Set Local IP
sys.path.append( SPARK_HOME + "/python") # Add python files to Python Path


from pyspark.mllib.classification import LogisticRegressionWithSGD
import numpy as np
from pyspark import SparkConf, SparkContext


def getSparkContext():
    """
    Gets the Spark Context
    """
    conf = (SparkConf()
         .setMaster("local") # run on local
         .setAppName("Logistic Regression") # Name of App
         .set("spark.executor.memory", "1g")) # Set 1 gig of memory
    sc = SparkContext(conf = conf) 
    return sc

def mapper(line):
    """
    Mapper that converts an input line to a feature vector
    """    
    feats = line.strip().split(",") 
    # labels must be at the beginning for LRSGD
    label = feats[len(feats) - 1] 
    feats = feats[: len(feats) - 1]
    feats.insert(0,label)
    features = [ float(feature) for feature in feats ] # need floats
    return np.array(features) # change to LabeledPoint

sc = pyspark.SparkContext()

data = sc.textFile("hdfs://localhost/user/hduser2/data")
parsedData = data.map(mapper)

model = LogisticRegressionWithSGD.train(parsedData)

labelsAndPreds = parsedData.map(lambda point: (int(point.item(0)), 
        model.predict(point.take(range(1, point.size)))))

trainErr = labelsAndPreds.filter(lambda v_p: v_p[0] != v_p[1]).count() / float(parsedData.count())

print("Training Error = " + str(trainErr))
