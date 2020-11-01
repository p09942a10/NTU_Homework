package com.geekcap.hadoopexamples;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

import org.apache.hadoop.io.WritableComparable;

public class DateWritable implements WritableComparable<DateWritable>
{
	private final static SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd' T 'HH:mm:ss.SSS" );
	private Date date;

	public Date getDate()
	{
		return date;
	}

	public void setDate( Date date )
	{
		this.date = date;
	}

	public void readFields( DataInput in ) throws IOException
	{
		date = new Date( in.readLong() );
	}

	public void write( DataOutput out ) throws IOException
	{
		out.writeLong( date.getTime() );
	}

	public String toString()
	{
		return formatter.format( date);
	}

    public int compareTo( DateWritable other )
    {
        return date.compareTo( other.getDate() );
    }
}
The DateWritable class is straightforward: It wraps a date, implements the readFields() method by reading the date in as a long, and writes the date out to the DataOutput by converting the date to a long. Finally, the comparison is delegated to the Date class’s compareTo() method.

With this key in place, the next step is to build a Hadoop class that uses this key in a mapper, build a reducer, and assemble it into a workable application. Listing 2 shows the code for the LogCountsPerHour Hadoop application.

Listing 2. LogCountsPerHour.java
package com.geekcap.hadoopexamples;

import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.apache.hadoop.mapred.KeyValueTextInputFormat;
import org.apache.hadoop.mapred.TextOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;

import java.io.IOException;
import java.util.Calendar;
import java.util.Iterator;

public class LogCountsPerHour extends Configured implements Tool {

    public static class LogMapClass extends MapReduceBase
            implements Mapper<LongWritable, Text, DateWritable, IntWritable>
    {
        private DateWritable date = new DateWritable();
        private final static IntWritable one = new IntWritable( 1 );

        public void map( LongWritable key,
                         Text value,
                         OutputCollector<DateWritable, IntWritable> output,
                         Reporter reporter) throws IOException
        {
            String text = value.toString();

            int openBracket = text.indexOf( '[' );
            int closeBracket = text.indexOf( ']' );
            if( openBracket != -1 && closeBracket != -1 )
            {
            	String dateString = text.substring( text.indexOf( '[' ) + 1, text.indexOf( ']' ) );

                int index = 0;
                int nextIndex = dateString.indexOf( '/' );
                int day = Integer.parseInt( dateString.substring(index, nextIndex) );

                index = nextIndex;
                nextIndex = dateString.indexOf( '/', index+1 );
                String month = dateString.substring( index+1, nextIndex );

                index = nextIndex;
                nextIndex = dateString.indexOf( ':', index );
                int year = Integer.parseInt(dateString.substring(index + 1, nextIndex));

                index = nextIndex;
                nextIndex = dateString.indexOf( ':', index+1 );
                int hour = Integer.parseInt(dateString.substring(index + 1, nextIndex));

                Calendar calendar = Calendar.getInstance();
                calendar.set( Calendar.DATE, day );
                calendar.set( Calendar.YEAR, year );
                calendar.set( Calendar.HOUR, hour );
                calendar.set( Calendar.MINUTE, 0 );
                calendar.set( Calendar.SECOND, 0 );
                calendar.set( Calendar.MILLISECOND, 0 );

                if( month.equalsIgnoreCase( "dec" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.DECEMBER );
                }
                else if( month.equalsIgnoreCase( "nov" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.NOVEMBER );
                }
                else if( month.equalsIgnoreCase( "oct" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.OCTOBER );
                }
                else if( month.equalsIgnoreCase( "sep" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.SEPTEMBER );
                }
                else if( month.equalsIgnoreCase( "aug" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.AUGUST );
                }
                else if( month.equalsIgnoreCase( "jul" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.JULY );
                }
                else if( month.equalsIgnoreCase( "jun" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.JUNE );
                }
                else if( month.equalsIgnoreCase( "may" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.MAY );
                }
                else if( month.equalsIgnoreCase( "apr" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.APRIL );
                }
                else if( month.equalsIgnoreCase( "mar" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.MARCH );
                }
                else if( month.equalsIgnoreCase( "feb" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.FEBRUARY );
                }
                else if( month.equalsIgnoreCase( "jan" ) )
                {
                    calendar.set( Calendar.MONTH, Calendar.JANUARY );
                }

                date.setDate( calendar.getTime() );
                output.collect(date, one);
            }
        }
    }

    public static class LogReduce extends MapReduceBase
            implements Reducer<DateWritable, IntWritable, DateWritable, IntWritable>
    {
        public void reduce( DateWritable key, Iterator<IntWritable> values,
                            OutputCollector<DateWritable, IntWritable> output,
                            Reporter reporter) throws IOException
        {
            int count = 0;
            while( values.hasNext() )
            {
                count += values.next().get();
            }

            output.collect( key, new IntWritable( count ) );
        }
    }


    public int run(String[] args) throws Exception
    {
        Configuration conf = getConf();

        JobConf job = new JobConf( conf, LogCountsPerHour.class );

        Path in = new Path( args[0] );
        Path out = new Path( args[1] );

        FileInputFormat.setInputPaths( job, in );
        FileOutputFormat.setOutputPath( job, out );

        job.setJobName( "LogAveragePerHour" );
        job.setMapperClass( LogMapClass.class );
        job.setReducerClass( LogReduce.class );
        job.setCombinerClass( LogReduce.class );

        job.setOutputFormat( TextOutputFormat.class );
        job.setOutputKeyClass( DateWritable.class );
        job.setOutputValueClass( IntWritable.class );

        JobClient.runJob(job);
        return 0;
    }

    public static void main(String[] args) throws Exception
    {
        int res = ToolRunner.run( new Configuration(),
                new LogCountsPerHour(),
                args );
        System.exit( res );
    }
}
