e_sound = wavread("/Users/theo/workspace/guitar_ruler/fixtures/e.wav");

sample_rate = 44100;

function sample=find_start(sound)
  [value, sample] = max(sound);
endfunction

function sample=find_end(sound)
  sample = length(sound);
endfunction

function output=snippet(sound,start_sample)
  number_of_samples = 8192;
  end_sample = start_sample+number_of_samples;
  output = sound(start_sample:end_sample);
endfunction

function plotsnippet(sound)

  fmin   = 50;
  fmax   = 2000;
  rate   = 44100;
  points = 8192;

  analyze(sound,fmin,fmax,rate);

endfunction

function print_snippets(sound)

  start_sample = find_start(sound);
  end_sample   = find_end(sound);

  number_of_graphs = 5;

  sample_distance = (end_sample - start_sample) / number_of_graphs;

  for i = 0:(number_of_graphs-1);
    // Create a graph window
    scf(i);

    sample = i * sample_distance + start_sample;

    chunk = snippet(sound,sample);

    plotsnippet(chunk);
  end

endfunction
